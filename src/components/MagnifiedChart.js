import React, {useState, useMemo, useEffect} from 'react';
import {throttle, minBy, maxBy, last, merge} from 'lodash';
import {VictoryChart, VictoryZoomContainer, VictoryScatter, VictoryTooltip, VictoryTheme} from 'victory';
import {THEME} from "../utils";

const day = 86400000;
const twoMonths = day * 31 * 2;
const {grayscale: grayscaleTheme} = VictoryTheme;


const MagnifiedChart = ({data, maxPoints, axisStyles}) => {
    const [zoomXDomain, setZoomXDomain] = useState([new Date(1990, 1, 1), new Date(2020, 12, 1)]);
    const [entireDomain, setEntireDomain] = useState({});
    const [theme, setTheme] = useState({});

    useEffect(() => {
        setEntireDomain({
            x: [data[0].year, last(data).year],
            y: [minBy(data, d => d.aqi).aqi, maxBy(data, d => d.aqi).aqi],
        });

        let mergedTheme = {
            axis: {
                style: {
                    ...axisStyles,
                    axis: {
                        stroke: THEME.lightGrey,
                    },
                }
            }
        };
        mergedTheme = merge(grayscaleTheme, mergedTheme);
        setTheme(mergedTheme);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderedData = useMemo(() => {
        const startIndex = data.findIndex((d) => d.year >= zoomXDomain[0]);
        const endIndex = data.findIndex((d) => d.year > zoomXDomain[1]);
        const filtered = data.slice(startIndex, endIndex);

        if (filtered.length > maxPoints) {
            const k = Math.pow(2, Math.ceil(Math.log2(filtered.length / maxPoints)));
            return filtered.filter(
                (d, i) => (((i + startIndex) % k) === 0)
            );
        }

        return filtered;

    }, [zoomXDomain, data, maxPoints]);

    return (
        <div className="bg-gray-700 p-3 lg:p-5 rounded-lg overflow-hidden">
            <p className="text-white text-2xl text-center">Magnified Chart</p>
            <VictoryChart
                domainPadding={20}
                width={600} height={470}
                domain={entireDomain}
                containerComponent={
                    <VictoryZoomContainer
                        zoomDimension="x"
                        minimumZoom={{x: twoMonths}}
                        onZoomDomainChange={throttle((domain) => setZoomXDomain(domain.x), 300)}
                    />
                }
                theme={theme}
            >
                <VictoryScatter
                    data={renderedData}
                    size={5}
                    style={{data: {fill: ({datum}) => datum.airQuality.color}}}
                    labels={({datum}) => {
                        const {aqi, month, year} = datum;

                        return `AQI: ${aqi} \n ${month} ${year.getFullYear()}`;
                    }}
                    labelComponent={
                        <VictoryTooltip
                            horizontal
                            constrainToVisibleArea
                            orientation="top"
                            pointerWidth={1}
                            flyoutStyle={{
                                fill: THEME.darkBlue,
                                stroke: THEME.darkBlue,
                                strokeWidth: 0.5,
                            }}
                            style={{fontSize: 10, fill: '#fff'}}
                        />
                    }
                    x="year"
                    y="aqi"
                />
            </VictoryChart>
        </div>
    );
};

export default MagnifiedChart;
