import React, {useState} from 'react';
import {
    VictoryChart,
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryAxis,
    VictoryScatter,
    VictoryTooltip
} from 'victory';

const MagnifiedChart = ({data}) => {
    const [zoomDomain, setZoomDomain] = useState({x: [new Date(2018, 1, 1), new Date(2020, 12, 1)]});

    return (
        <div className="overflow-hidden">
            <VictoryChart
                domainPadding={20}
                width={600} height={470} scale={{x: "time"}}
                containerComponent={
                    <VictoryZoomContainer
                        zoomDimension="x"
                        zoomDomain={zoomDomain}
                        onZoomDomainChange={(domain) => setZoomDomain(domain)}
                    />
                }
            >
                <VictoryScatter
                    data={data}
                    size={5}
                    style={{data: {fill: "tomato"}}}
                    labels={({datum}) => datum.aqi}
                    labelComponent={<VictoryTooltip/>}
                    x="year"
                    y="aqi"
                />
            </VictoryChart>
            <VictoryChart
                domainPadding={10}
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
                <VictoryAxis tickFormat={(x) => new Date(x).getFullYear()}/>
                <VictoryScatter
                    data={data}
                    size={1}
                    style={{data: {fill: "tomato"}}}
                    x="year"
                    y="aqi"
                />
            </VictoryChart>
        </div>
    );
};

export default MagnifiedChart;
