import React, {useMemo} from 'react';
import {Link, useParams} from "react-router-dom";
import HistoricalChart from "../components/HistoricalChart";
import {MdOutlineArrowBack} from 'react-icons/md/index';
import CityCard from "../components/CityCard";
import {MONTHS_ABBREVIATION} from "../constants/global-constans";
import {getAirQualityByIndex, THEME} from "../utils";
import range from "lodash/range";
import MagnifiedChart from "../components/MagnifiedChart";
import Loading from "../components/Loading";

let dummyData = {};
const magnifiedChartData = [];
const YEARS = range(1990, 2021);
const {lightGrey} = THEME;
const axisStyles = {
    axis: {
        stroke: "transparent",
    },
    tickLabels: {
        fill: lightGrey,
        fontSize: 12,
        fontWeight: 700
    },
    axisLabel: {
        fill: lightGrey,
        padding: 36,
        fontSize: 12,
        fontStyle: "italic"
    }
};

const CityPage = ({cities}) => {
    const {cityName} = useParams();
    const cityObj = cities[cityName];

    useMemo(() => {
        YEARS.forEach((year) => {
            dummyData[year] = MONTHS_ABBREVIATION.map((month, index) => {
                const randomAqi = (Math.floor(Math.random() * 400) + 30);
                const monthData = {
                    city: cityName,
                    aqi: randomAqi,
                    airQuality: getAirQualityByIndex(randomAqi),
                    month,
                    year: new Date(year, index, 1)
                };

                magnifiedChartData.push(monthData);

                return monthData;
            });
        });
    }, [cityName]);

    if (!cityObj) {
        return <Loading/>;
    }

    return (
        <>
            <div className="mb-3 text-base text-blue-500 flex items-center">
                <MdOutlineArrowBack className="mr-1"/>
                <Link to="/">Home</Link>
            </div>
            <div className="overview-wrapper">
                <h1 className="text-2xl mb-4 font-bold"> What is the current air quality in {cityObj.city}?</h1>
            </div>
            <div className="my-5 bg-white shadow-md rounded-xl">
                <CityCard city={cityObj} isLinked={false}/>
                <p className="mb-3 p-3 pt-0 text-gray-400">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                    deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                    provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
                    fuga.
                </p>
            </div>
            <div className="my-5">
                <HistoricalChart {...{cityObj, cityName, dummyData, axisStyles}} />
            </div>
            <div className="my-5">
                <MagnifiedChart data={magnifiedChartData} maxPoints={100} axisStyles={axisStyles}/>
            </div>
        </>
    )
};

export default CityPage;