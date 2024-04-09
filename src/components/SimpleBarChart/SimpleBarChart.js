import {BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {useEffect, useState} from "react";
import "./SimpleBarChart.scss";

function SimpleBarChart(props) {
    const [data, setData] = useState(props.data);
    const [cleanData, setCleanData] = useState(null);

    useEffect(() => {
        let i = 1;
        data.forEach(function (donneeTmp) {
            donneeTmp.id = i;
            i++;
        });
        setCleanData(data);
    }, []);

    function toolTipFormater(value, name) {
        return [value + (name === "calories" ? "kCal" : "kg")];
    }

    return (
        cleanData && (
            <ResponsiveContainer width="95%" height="95%">
                <BarChart data={cleanData}
                          margin={{ top: 7, right: 5, left: 5, bottom: 5  }}
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
        ));
}

export default SimpleBarChart;
