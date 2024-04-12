import {useEffect, useState} from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    CartesianGrid, CartesianAxis
} from 'recharts';
import "./SimpleRadarChart.scss";

function SimpleRadarChart(props) {
    const [data, setData] = useState(props.data.data);
    const [kind, setkind] = useState(props.data.kind);
    const [cleanData, setCleanData] = useState(null);

    useEffect(() => {
        data.forEach(function (dataTmp) {
            if (kind[dataTmp.kind])
                dataTmp.kind = kind[dataTmp.kind];
        });

        setCleanData(data);
    }, []);

    return (
        cleanData && (
            <div id="SimpleRadarChart">
                <ResponsiveContainer>
                    <RadarChart
                        data={cleanData}
                        margin={{ top: 7, right: 50, left: 50, bottom: 5  }}
                    >
                        <PolarGrid
                            radialLines={false}
                            stroke={"#fff"}/>
                        <PolarAngleAxis
                            dataKey="kind"
                            tickLine={false}
                            stroke={"#fff"}/>
                        <PolarRadiusAxis
                            tickCount={6}
                            tick={false}
                            axisLine={false}/>
                        <Radar
                            dataKey="value"
                            fill="#FF0101"
                            fillOpacity={0.7}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        )
    );
}

export default SimpleRadarChart;
