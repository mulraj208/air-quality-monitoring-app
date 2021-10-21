import React, {useMemo} from 'react';
import range from 'lodash/range';
import {
    VictoryChart,
    VictoryLabel,
    VictoryBar,
    VictoryTooltip,
    VictoryAxis
} from 'victory';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {MONTHS_ABBREVIATION} from "../constants/global-constans";
import {getAirQualityByIndex, truncateText} from "../utils";

const LIGHT_GREY = "hsl(355, 20%, 90%)";

let dummyData = {};
const YEARS = range(1990, 2021);
const yearToSeason = year => `${year}-${(year + 1 + "").slice(2, 4)}`;
const FIRST_YEAR = YEARS[0];
const LAST_YEAR = YEARS[YEARS.length - 1];
const TOTAL_YEARS = LAST_YEAR - FIRST_YEAR;

const axisStyles = {
    axis: {
        stroke: "transparent"
    },
    tickLabels: {
        fill: LIGHT_GREY,
        fontSize: 12
    },
    axisLabel: {
        fill: LIGHT_GREY,
        padding: 36,
        fontSize: 12,
        fontStyle: "italic"
    }
};

const fillBarColor = ({datum}) => datum.airQuality.color;

const HistoricalChart = ({cityObj}) => {
    const [year, setYear] = React.useState(FIRST_YEAR);
    const cityName = cityObj.city;

    useMemo(() => {
        YEARS.forEach((year) => {
            dummyData[year] = MONTHS_ABBREVIATION.map((month) => {
                const randomAqi = (Math.floor(Math.random() * 400) + 30);

                return {
                    city: cityName,
                    aqi: randomAqi,
                    airQuality: getAirQualityByIndex(randomAqi),
                    month
                }
            });
        });
    }, [cityName]);

    return (
        <div className="bg-gray-700 p-3 lg:p-5 rounded-lg">
            <VictoryChart>
                <VictoryLabel
                    text={`Historic air quality graph for ${cityName} (${yearToSeason(year)})`}
                    x={225}
                    y={18}
                    textAnchor="middle"
                    style={{fill: LIGHT_GREY, fontSize: 16}}
                />
                <VictoryAxis
                    tickFormat={(label) => truncateText(label)}
                    style={axisStyles}
                    tickValues={MONTHS_ABBREVIATION}
                />
                <VictoryAxis
                    dependentAxis
                    fixLabelOverlap
                    tickFormat={(label) => Math.round(label)}
                    tickCount={6}
                    label="Air Quality Index(AQI)"
                    style={axisStyles}
                />
                <VictoryBar
                    x="month"
                    y="aqi"
                    style={{data: {fill: fillBarColor, strokeLinejoin: "round", strokeWidth: 8}}}
                    barWidth={4}
                    data={dummyData[year]}
                    animate={{onLoad: {duration: 1000}}}
                    labels={({datum}) => {
                        const {aqi, month} = datum;

                        return `AQI: ${aqi} \n ${month} ${year}`;
                    }}
                    labelComponent={
                        <VictoryTooltip
                            horizontal
                            constrainToVisibleArea
                            orientation="top"
                            pointerWidth={1}
                            flyoutStyle={{
                                fill: "#142b7e",
                                stroke: "#142b7e",
                                strokeWidth: 0.5,
                            }}
                            style={{fontSize: 10, fill: '#fff'}}
                        />
                    }
                />
            </VictoryChart>
            <YearSlider year={year} setYear={setYear}/>
        </div>
    );
};

const getYear = percent => Math.round(FIRST_YEAR + TOTAL_YEARS * (percent / 100));

const YearSlider = ({year, setYear}) => {
    const [value, setValue] = React.useState(0);

    return (
        <div className="p-2">
            <Slider
                onChange={newValue => {
                    setValue(newValue);
                    const calculatedYear = getYear(newValue);

                    if (year !== calculatedYear) {
                        setYear(calculatedYear);
                    }
                }}
                maxValue={100}
                min={0}
                max={100}
                value={value}
                format={(value) => `${getYear(value)}`}
            />
        </div>
    );
};


export default HistoricalChart;
