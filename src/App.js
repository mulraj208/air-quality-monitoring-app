import React, {useEffect, useState} from 'react';
import {getRelativeTime} from "./utils/date-utils";
import {WEB_SOCKET_URL} from "./constants/global-constans";
import './App.css';
import {getAirQualityByIndex} from "./utils";

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
                const newObj = Object.assign(prevCityObj || {}, {...item, timestamp});

                return acc.set(item.city, newObj);
            }

            return acc;
        }, new Map()).values()];

        setCities(mergedData);
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
        <div className="app-container">
            <div className="rounded-t-xl overflow-hidden p-10">
                <table className="table-fixed w-full text-left">
                    <thead>
                    <tr>
                        <th className="border px-4 py-2 text-emerald-600">City</th>
                        <th className="border px-4 py-2 text-emerald-600">Current AQI</th>
                        <th className="border px-4 py-2 text-emerald-600">Last Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cities.map((item) => {
                            const airQuality = getAirQualityByIndex(item.aqi);

                            return (
                                <tr key={item.city} style={{backgroundColor: airQuality.color}}>
                                    <td className="border px-4 py-2 font-medium">
                                        {item.city}
                                    </td>
                                    <td className="border px-4 py-2 font-medium">
                                        {item.aqi.toFixed(2)}
                                    </td>
                                    <td className="border px-4 py-2 font-medium">
                                        {getRelativeTime(item.timestamp)}
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
