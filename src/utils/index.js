import {AIR_QUALITY_STANDARDS} from "../constants/global-constans";

export function getAirQualityByIndex(aqi) {
    const AQI = aqi >= 0 ? Math.ceil(aqi) : 0;
    const airQuality = AIR_QUALITY_STANDARDS.find((item) => (AQI >= item.aqiMin && AQI <= item.aqiMax));

    if (airQuality) {
        return airQuality;
    }

    return AIR_QUALITY_STANDARDS[AIR_QUALITY_STANDARDS.length - 1];
}

export function truncateText(string, maxCharacters = 10) {
    const truncateBy = maxCharacters - 3;

    if (string.length > maxCharacters) {
        return string.substring(0, truncateBy) + '...';
    }

    return string;
}

export function urlSlug(str) {
    return str.trim().toLowerCase().split(/\s+/).join("-");
}

export const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);


export const THEME = {
    lightGrey: "#ebe0e1",
    darkBlue: "#142b7e",
};