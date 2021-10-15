import {AIR_QUALITY_STANDARDS} from "../constants/global-constans";

export function getAirQualityByIndex(aqi) {
    const AQI = aqi >= 0 ? Math.round(aqi): 0;
    const airQuality = AIR_QUALITY_STANDARDS.find((item) => (AQI >= item.aqiMin && AQI <= item.aqiMax));

    if (airQuality) {
        return airQuality;
    }

    return AIR_QUALITY_STANDARDS[AIR_QUALITY_STANDARDS.length - 1];
}