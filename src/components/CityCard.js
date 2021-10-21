import React from 'react';
import {Link} from "react-router-dom";
import {MdOutlineWbSunny, MdOutlineWaterDrop, MdSpeed} from 'react-icons/md/index';
import {FaTemperatureHigh} from 'react-icons/fa';
import {getRelativeTime} from "../utils/date-utils";
import {ConditionalWrapper} from "../utils";

const CityCard = ({city, isLinked = true}) => {
    return (
        <ConditionalWrapper
            condition={isLinked}
            wrapper={(children) => <Link to={`/city/${city.citySlug}`} className="block">{children}</Link>}
        >
            <div className={`bg-white rounded-lg p-3 ${isLinked ? 'hover:shadow-md' : ''}`}>
                <div className="flex mb-6">
                    <div
                        style={{backgroundColor: city.airQuality.color}}
                        className="flex flex-col items-center justify-center w-20 mr-4 rounded-lg"
                    >
                        <MdSpeed className="text-5xl fill-current text-white"/>
                        <div className="flex items-baseline text-white">
                            <span className="text-base mr-2">{Math.round(city.aqi)}</span>
                            <span className="text-xs">AQI</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl line-clamp-2">{city.city}</h2>
                        <p className="mb-2 text-sm text-gray-400 truncate">{getRelativeTime(city.timestamp)}</p>
                        <div className="flex">
                            <div className="flex items-center mr-2">
                                <FaTemperatureHigh className="fill-current text-base text-gray-400 mr-1"/>
                                <span className="text-sm truncate">22°C</span>
                            </div>
                            <div className="flex items-center mr-2">
                                <MdOutlineWaterDrop className="fill-current text-base text-gray-400 mr-1"/>
                                <span className="text-sm truncate">34%</span>
                            </div>
                            <div className="flex items-center mr-2">
                                <MdOutlineWbSunny className="fill-current text-base text-gray-400 mr-1"/>
                                <span className="text-sm truncate">Sunny</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="line-clamp-3">
                    Air quality is <span
                    style={{color: city.airQuality.color}}>{city.airQuality.category}</span> today.
                </p>
            </div>
        </ConditionalWrapper>
    )
};

export default CityCard;

