import React, {useState} from 'react';
import {VictoryChart, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis} from 'victory';

const data = [
    {a: new Date(1982, 1, 1), b: 125},
    {a: new Date(1987, 1, 1), b: 257},
    {a: new Date(1993, 1, 1), b: 345},
    {a: new Date(1997, 1, 1), b: 515},
    {a: new Date(2001, 1, 1), b: 132},
    {a: new Date(2005, 1, 1), b: 305},
    {a: new Date(2011, 1, 1), b: 270},
    {a: new Date(2015, 1, 1), b: 470}
];

const ZoomChart = () => {
    const [zoomDomain, setZoomDomain] = useState({});

    return (
        <div>
            <VictoryChart
                width={600} height={470} scale={{x: "time"}}
                containerComponent={
                    <VictoryZoomContainer
                        zoomDimension="x"
                        zoomDomain={zoomDomain}
                        onZoomDomainChange={(domain) => setZoomDomain(domain)}
                    />
                }
            >
                <VictoryLine
                    style={{
                        data: {stroke: "tomato"}
                    }}
                    data={data}
                    x="a"
                    y="b"
                />

            </VictoryChart>
            <VictoryChart
                padding={{top: 0, left: 50, right: 50, bottom: 30}}
                width={600} height={100} scale={{x: "time"}}
                containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={zoomDomain}
                        onBrushDomainChange={(domain) => setZoomDomain(domain)}
                    />
                }
            >
                <VictoryAxis
                    tickFormat={(x) => new Date(x).getFullYear()}
                />
                <VictoryLine
                    style={{
                        data: {stroke: "tomato"}
                    }}
                    data={data}
                    x="key"
                    y="b"
                />
            </VictoryChart>
        </div>
    );
};


export default ZoomChart;