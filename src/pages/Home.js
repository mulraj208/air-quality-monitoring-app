import React from 'react';
import ComparisonChart from "../components/ComparisonChart";
import CitiesTable from "../components/CitiesTable";
import CityCard from "../components/CityCard";

const Home = ({cities}) => {
    return (
        <>
            <h1 className="text-2xl mb-5 font-bold">Air Quality Monitoring App</h1>

            <div className="grid md:grid-cols-2 gap-4 my-5">
                {cities.map((city) => <CityCard key={city.city} city={city} />)}
            </div>

            <div className="my-5 pr-3 bg-white">
                <ComparisonChart cities={cities}/>
            </div>

            <div className="my-5 bg-white overflow-hidden">
                <CitiesTable cities={cities}/>
            </div>
        </>
    );
};

export default Home;