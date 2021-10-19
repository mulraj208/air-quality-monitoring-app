import React, {useMemo} from 'react';
import {VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip} from 'victory';
import {truncateText} from "../utils";

const axisStyles = {
    tickLabels: {
        fontSize: 10
    },
    axisLabel: {
        padding: 40,
        fontSize: 14,
        fontStyle: "italic"
    }
};

const ComparisonChart = ({cities}) => {
    const tickValues = useMemo(() => cities.map(item => item.city), [cities]);

    if (!cities.length) {
        return '';
    }

    return (
        <VictoryChart
            domainPadding={20}
            padding={{left: 70, bottom: 70, top: 30}}
            theme={VictoryTheme.material}
            responsive
        >
            <VictoryAxis
                tickFormat={(label) => truncateText(label)}
                style={axisStyles}
                tickValues={tickValues}
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
                horizontal
                x="city"
                y="aqi"
                style={{data: {fill: ({datum}) => datum.airQuality.color}}}
                data={cities}
                animate={{onLoad: {duration: 1000}}}
                labels={({datum}) => `City: ${datum.city} \n AQI: ${Math.round(datum.aqi)} \n Air Quality: ${datum.airQuality.category}`}
                labelComponent={
                    <VictoryTooltip
                        horizontal
                        constrainToVisibleArea
                        orientation="bottom"
                        pointerOrientation="bottom"
                        flyoutStyle={{
                            fill: "#f5f5f5",
                            stroke: "#f5f5f5",
                            strokeWidth: 0.5,
                        }}
                        style={{fontSize: 10}}
                    />
                }
            />
        </VictoryChart>
    )
};

export default ComparisonChart;
