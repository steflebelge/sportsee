import {useEffect, useState} from "react";
import {LineChart, Line, Legend, XAxis, ResponsiveContainer, Tooltip, Rectangle} from 'recharts';
import "./SimpleLineChart.scss";

function SimpleLineChart(props) {
    const [cleanData, setCleanData] = useState(null);
    let jds = ["L", "M", "M", "J", "V", "S", "D"];
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cleanData)
            return;

        if (!props || !props.data || !props.data.sessions) {
            setError("No data");
            return;
        }

        setError(null);
        let i = 0;
        props.data.sessions.forEach(function (donneeTmp) {
            donneeTmp.day = jds[i];
            i++;
        });

        // console.log("SimpleLineChart set data");
        setCleanData(props.data);
    }, [props]);

    function toolTipFormater(value) {
        return [value + " min"];
    }

    function CustomCursor(props) {
        const {points, width, height} = props
        const {x, y} = points[0];
        return (
            <Rectangle
                fill="#000000"
                fillOpacity="10%"
                x={x}
                y={y - 60}
                width={width + 100}
                height={height + 100}
                style={{transition: 'all ease-out 0.3s'}}
            />
        )
    }

    return (
        <>
            {error ? (
                <p style={{margin: "auto"}}>{error}</p>
            ) : (
                cleanData && (
                    <ResponsiveContainer id="lineChart" width="100%" height="100%">
                        <LineChart
                            width={300}
                            height={100}
                            data={cleanData.sessions}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <defs>
                                <linearGradient
                                    id="linear"
                                >
                                    <stop offset="0%" stopColor="#CC74798C"/>
                                    <stop offset="100%" stopColor="#ffffff"/>
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="day"
                                width="50%"
                                tickLine={false}
                                axisLine={false}
                            />
                            <Line
                                dataKey="sessionLength"
                                type="bump"
                                stroke="url(#linear)"
                                dot={false}
                                activeDot={{stroke: "#FFFFFF88", fill: "#fff", strokeWidth: 10, r: 5}}
                                strokeWidth={5}/>
                            <Legend
                                verticalAlign="top"
                                align={"left"}
                                iconSize={0}
                                payload={[{value: 'Durée moyenne des sessions'}]}
                                width={175}/>
                            <Tooltip
                                contentStyle={{border: "none", padding: "5px", backgroundColor: "#fff"}}
                                labelStyle={{display: "none"}}
                                formatter={
                                    (value, name) => toolTipFormater(value, name)
                                }
                                cursor={<CustomCursor/>}
                                itemStyle={{backgroundColor: "#fff", color: "#020203"}}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ))}
        < />
    );
}

export default SimpleLineChart;
