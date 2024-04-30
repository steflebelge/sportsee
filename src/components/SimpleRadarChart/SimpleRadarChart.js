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
    const [data, setData] = useState(null);
    const [kind, setkind] = useState(null);
    const [cleanData, setCleanData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cleanData)
            return;

        if (!props || !props.data || !props.data.data) {
            setError("No data");
            return;
        }

        setError(null);
        props.data.data.forEach(function (dataTmp) {
            if (props.data.kind[dataTmp.kind])
                dataTmp.kind = props.data.kind[dataTmp.kind];
        });

        console.log("SimpleRadarChart set data");
        setCleanData(props.data);
    }, [props]);

    return (
        <>
            {error ? (
                <p style={{margin: "auto"}}>{error}</p>
            ) : (
                cleanData && (
                <div id="SimpleRadarChart">
                <ResponsiveContainer>
                    <RadarChart
                        data={cleanData.data}
                        margin={{top: 7, right: 50, left: 50, bottom: 5}}
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
            ))}
        </>
    );
}

export default SimpleRadarChart;
