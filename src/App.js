import React, {useEffect, useState} from 'react';
import {getRelativeTime} from "./utils/date-utils";
import {WEB_SOCKET_URL} from "./constants/global-constans";
import {getAirQualityByIndex} from "./utils";
import ComparisonChart from "./components/ComparisonChart";
import './App.css';

const client = new WebSocket(WEB_SOCKET_URL);

let t = (new Date()).getTime();

function App() {
    const [cities, setCities] = useState([]);

    const onMessage = (message) => {
        const data = JSON.parse(message.data);
        const mergedData = [...cities.concat(data).reduce((acc, item) => {
            const prevCityObj = acc.get(item.city);

            // Check if city is present, if not then add
            // Check if the Aqi is changed
            if (!prevCityObj || (prevCityObj.aqi !== item.aqi)) {
                const timestamp = (new Date()).getTime();
                const airQuality = getAirQualityByIndex(item.aqi);
                const newObj = Object.assign(prevCityObj || {}, {
                    ...item,
                    aqi: (parseFloat(item.aqi)).toFixed(2),
                    airQuality,
                    timestamp
                });

                return acc.set(item.city, newObj);
            }

            return acc;
        }, new Map()).values()];

        const sortDataByAQI = mergedData.sort((a, b) => a.aqi - b.aqi);

        setCities(sortDataByAQI);
    };

    console.log(t, getRelativeTime(t));

    useEffect(() => {
        client.onopen = () => console.log('WebSocket Client Connected');
        client.onclose = () => console.log('WebSocket Client Disconnected');

        setTimeout(() => {
            client.close();
        }, 4000);

        return () => {
            client.close();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        client.onmessage = onMessage;
    });

    return (
        <div className="app-container max-w-screen-xl mx-auto my-4 px-3 xl:px-5">
            <h1 className="text-2xl mb-4 font-bold">Air Quality Monitoring App</h1>

            <div className="overflow-hidden">
                <table className="table-fixed w-full text-left">
                    <thead>
                    <tr>
                        <th className="border px-4 py-2">City</th>
                        <th className="border px-4 py-2">Current AQI</th>
                        <th className="border px-4 py-2">Last Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cities.map((item) => (
                        <tr key={item.city}>
                            <td className="border px-4 py-2 font-medium">
                                {item.city}
                            </td>
                            <td
                                className="border px-4 py-2 font-medium"
                                style={{backgroundColor: item.airQuality.color}}
                            >
                                {item.aqi}
                            </td>
                            <td className="border px-4 py-2 font-medium capitalize">
                                {getRelativeTime(item.timestamp)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="my-5">
                <ComparisonChart citiesData={cities}/>
            </div>
        </div>
    );
}

export default App;
