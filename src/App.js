import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {WEB_SOCKET_URL} from "./constants/global-constans";
import {getAirQualityByIndex, urlSlug} from "./utils";
import CityPage from "./pages/CityPage";
import Home from "./pages/Home";
import './App.css';

const client = new WebSocket(WEB_SOCKET_URL);
let citiesObj = {};

function App() {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        client.onopen = () => console.log('WebSocket Client Connected');
        client.onclose = () => console.log('WebSocket Client Disconnected');

        client.onmessage = (message) => {
            const data = JSON.parse(message.data);

            data.forEach((item) => {
                const citySlug = urlSlug(item.city);
                const prevCityObj = citiesObj[citySlug];

                // Check if city is present, if not then add
                // Check if the Aqi is changed
                if (!prevCityObj || (prevCityObj.aqi !== item.aqi)) {
                    const timestamp = (new Date()).getTime();
                    const airQuality = getAirQualityByIndex(item.aqi);
                    const newObj = {
                        ...item,
                        aqi: (parseFloat(item.aqi)).toFixed(2),
                        airQuality,
                        citySlug,
                        timestamp
                    };

                    citiesObj = {...citiesObj, [citySlug]: newObj};
                }
            });

            // Array is needed for comparison chart
            const citiesSortedArr = Object.keys(citiesObj).map((key) => citiesObj[key]).sort((a, b) => (a.aqi - b.aqi));
            setCities(citiesSortedArr);
        };

        // Remove this before submitting
        // Check performance
        setTimeout(() => {
            client.close();
        }, 4000);

        return () => {
            client.close();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home cities={cities}/>
                </Route>
                <Route path="/city/:cityName">
                    <CityPage/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
