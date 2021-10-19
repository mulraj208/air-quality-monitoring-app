import React from 'react';
import {useParams} from "react-router-dom";

const CityPage = () => {
    let {cityName} = useParams();
    console.log(cityName);

    return (
        <h1>{cityName}</h1>
    )
};

export default CityPage;