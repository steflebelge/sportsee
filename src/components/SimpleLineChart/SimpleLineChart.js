import {useEffect, useState} from "react";
import {LineChart, Line, Legend, XAxis, ResponsiveContainer, Tooltip, Rectangle} from 'recharts';
import "./SimpleLineChart.scss";

function SimpleLineChart(props) {
    const [data, setData] = useState(props.data);
    const [cleanData, setCleanData] = useState(null);
    let jds = ["L", "M", "M", "J", "V", "S", "D"];

    useEffect(() => {
        let i = 0;
        data.forEach(function (donneeTmp) {
            donneeTmp.day = jds[i];
            i++;
        });
        setCleanData(data);
    }, []);

    function toolTipFormater(value) {
        return [value + " min"];
    }

    function CustomCursor(props) {
        const { points, width, height } = props
        const { x, y } = points[0];
        return (
            <Rectangle
                fill="#000000"
                fillOpacity="10%"
                x={x}
                y={y - 60}
                width={width + 100}
                height={height + 100}
                style={{ transition: 'all ease-out 0.3s' }}
            />
        )
    }
    return (
        cleanData && (
            <ResponsiveContainer id="lineChart" width="100%" height="100%">
                <LineChart
                    width={300}
                    height={100}
                    data={data}
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
                        cursor={<CustomCursor />}
                        itemStyle={{backgroundColor: "#fff", color: "#020203"}}
                    />
                </LineChart>
            </ResponsiveContainer>
        )
    );
}

export default SimpleLineChart;
