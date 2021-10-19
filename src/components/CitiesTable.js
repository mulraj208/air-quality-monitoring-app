import React from 'react';
import {Link} from "react-router-dom";
import {getRelativeTime} from "../utils/date-utils";

const CitiesTable = ({cities}) => {
    return (
        <div className="cities-table-container overflow-x-auto">
            <table className="w-full text-left mb-4">
                <thead>
                <tr>
                    <th className="border px-4 py-2 whitespace-nowrap">City</th>
                    <th className="border px-4 py-2 whitespace-nowrap">Current AQI</th>
                    <th className="border px-4 py-2 whitespace-nowrap">Last Updated</th>
                    <th className="border px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
                </thead>
                <tbody>
                {cities.map((city) => (
                    <tr key={city.city}>
                        <td className="border px-4 py-2 whitespace-nowrap font-medium">
                            {city.city}
                        </td>
                        <td
                            className="border px-4 py-2 whitespace-nowrap font-medium"
                            style={{backgroundColor: city.airQuality.color}}
                        >
                            {city.aqi}
                        </td>
                        <td className="border px-4 py-2 whitespace-nowrap font-medium capitalize">
                            {getRelativeTime(city.timestamp)}
                        </td>
                        <td className="border px-4 py-2 whitespace-nowrap font-medium">
                            <Link to={`/city/${city.citySlug}`} className="text-blue-500">
                                See History
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CitiesTable;