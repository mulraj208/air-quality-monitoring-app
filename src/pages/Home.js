import React from 'react';
import ComparisonChart from "../components/ComparisonChart";
import CitiesTable from "../components/CitiesTable";

const Home = ({cities}) => {
    return (
        <div className="app-container max-w-screen-xl mx-auto my-4 px-3 xl:px-5">
            <h1 className="text-2xl mb-4 font-bold">Air Quality Monitoring App</h1>

            <div className="grid lg:grid-cols-2 gap-4 my-5">
                <ComparisonChart cities={cities}/>
                <ComparisonChart cities={cities}/>
            </div>

            <div className="overflow-hidden">
                <CitiesTable cities={cities}/>
            </div>
        </div>
    );
};

export default Home;