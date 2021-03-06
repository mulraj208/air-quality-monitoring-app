import React, {useEffect, useState, lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {throttle} from 'lodash';
import {WEB_SOCKET_URL} from "./constants/global-constans";
import {getAirQualityByIndex, urlSlug} from "./utils";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollTop";
import './App.css';

const Home = lazy(() => import("./pages/Home"));
const CityPage = lazy(() => import("./pages/CityPage"));

const client = new WebSocket(WEB_SOCKET_URL);
let globalCitiesObj = {};

function App() {
    const [cities, setCities] = useState([]);
    const [citiesObj, setCitiesObj] = useState({});

    useEffect(() => {
        client.onopen = () => console.log('WebSocket Client Connected');
        client.onclose = () => console.log('WebSocket Client Disconnected');
        client.onerror = (event) => console.log('WebSocket Error', event);

        const onMessage = throttle(function (message) {
            const data = JSON.parse(message.data);

            data.forEach((item) => {
                const citySlug = urlSlug(item.city);
                const prevCityObj = globalCitiesObj[citySlug];

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

                    globalCitiesObj = {...globalCitiesObj, [citySlug]: newObj};
                }
            });

            // Array is needed for comparison chart
            const citiesSortedArr = Object.keys(globalCitiesObj).map((key) => globalCitiesObj[key]).sort((a, b) => (a.aqi - b.aqi));
            setCitiesObj(globalCitiesObj);
            setCities(citiesSortedArr);
        }, 5000, {leading: true});

        client.addEventListener('message', onMessage);

        return () => {
            client.removeEventListener('message', onMessage);
            client.close();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!cities.length) {
        return <Loading/>;
    }

    return (
        <main className="app-container max-w-3xl mx-auto p-3 xl:p-5 bg-gray-100">
            <Router>
                <ScrollToTop/>
                <Switch>
                    <Route exact path="/">
                        <Suspense fallback={<Loading/>}>
                            <Home cities={cities}/>
                        </Suspense>
                    </Route>
                    <Route path="/city/:cityName">
                        <Suspense fallback={<Loading/>}>
                            <CityPage cities={citiesObj}/>
                        </Suspense>
                    </Route>
                    <Route path="*">
                        <div className="min-h-screen flex items-center justify-center">
                            <h1 className="text-2xl mb-5 font-bold">Page Not Found!</h1>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </main>
    );
}

export default App;
