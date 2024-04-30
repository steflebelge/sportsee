import {BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {useEffect, useState} from "react";
import "./SimpleBarChart.scss";

function SimpleBarChart(props) {
    const [cleanData, setCleanData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cleanData)
            return;

        if (!props || !props.data || !props.data.sessions) {
            setError("No data");
            return;
        }

        setError(null);
        let i = 1;
        props.data.sessions.forEach(function (donneeTmp) {
            donneeTmp.id = i;
            i++;
        });

        console.log("SimpleBarChart set data");
        setCleanData(props.data);
    }, [props]);

    function toolTipFormater(value, name) {
        return [value + (name === "calories" ? "kCal" : "kg")];
    }

    return (
        <>
            {error ? (
                <p style={{margin: "auto"}}>{error}</p>
            ) : (
                cleanData && (
                    <ResponsiveContainer width="95%" height="95%">
                        <BarChart data={cleanData.sessions}
                                  margin={{top: 7, right: 5, left: 5, bottom: 5}}
                        >
                            <XAxis dataKey="id"/>
                            <YAxis tick={{fill: '#020203'}}
                                   tickLine={{stroke: '#020203'}}
                                   yAxisId="right"
                                   dataKey="kilogram"
                                   interval={1}
                                   orientation={"right"}/>
                            <YAxis
                                tick={{fill: '#E60000'}}
                                tickLine={{stroke: '#E60000'}}
                                yAxisId="left"
                                interval={1}
                                dataKey="calories"/>
                            <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                            <Tooltip
                                contentStyle={{border: "none", padding: "5px", backgroundColor: "#E60000"}}
                                labelStyle={{display: "none"}}
                                formatter={
                                    (value, name) => toolTipFormater(value, name)
                                }
                                itemStyle={{backgroundColor: "#E60000", color: "#fff"}}/>
                            <Bar
                                yAxisId="right"
                                barSize={7}
                                dataKey="kilogram"
                                radius={[3, 3, 0, 0]}
                                fill="#020203"/>
                            <Bar
                                yAxisId="left"
                                barSize={7}
                                dataKey="calories"
                                radius={[3, 3, 0, 0]}
                                fill="#E60000"/>
                        </BarChart>
                    </ResponsiveContainer>
                ))}
        < />
    );
}

export default SimpleBarChart;
