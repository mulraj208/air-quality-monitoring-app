import React from 'react';
import {Link, useParams} from "react-router-dom";
import HistoricalChart from "../components/HistoricalChart";
import {MdOutlineArrowBack} from 'react-icons/md/index';
import CityCard from "../components/CityCard";

const CityPage = ({cities}) => {
    const {cityName} = useParams();
    const cityObj = cities[cityName];

    if (!cityObj) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mb-3 text-base text-blue-500 flex items-center">
                <MdOutlineArrowBack className="mr-1" />
                <Link to="/">Home</Link>
            </div>
            <div className="overview-wrapper">
                <h1 className="text-2xl mb-4 font-bold"> What is the current air quality in {cityObj.city}?</h1>
            </div>
            <div className="my-5 bg-white shadow-md rounded-xl">
                <CityCard city={cityObj} isLinked={false} />
                <p className="mb-3 p-3 pt-0 text-gray-400">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                    deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                    provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
                    fuga.
                </p>
            </div>
            <HistoricalChart {...{cityObj, cityName}} />
        </>
    )
};

export default CityPage;