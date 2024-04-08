import {useEffect, useState} from "react";
import {ResponsiveContainer, PieChart, Pie, Legend, Cell} from "recharts";
import "./SimplePieChart.scss";

function SimplePieChart(props) {
    const [data, setData] = useState(props.data);
    const [cleanData, setCleanData] = useState(null);
    const COLORS = ['#E60000', '#fff'];

    useEffect(() => {
        let dataTmp = [];
        dataTmp[0] = data;
        dataTmp[1] = {"todayScore": 100 - data.todayScore};

        setCleanData(dataTmp);
    }, []);

    return (
        cleanData && (
            <div id="SimplePieChart">
                <p><span>{cleanData[0].todayScore}%</span> <br/> de votre objectif</p>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={cleanData}
                            dataKey="todayScore"
                            startAngle={180}
                            endAngle={-180}
                            innerRadius="85%"
                            outerRadius="100%"
                            paddingAngle={1}
                            cornerRadius={10}
                        >
                            {cleanData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Legend
                            verticalAlign="top"
                            align={"left"}
                            iconSize={0}
                            payload={[{value: 'Score'}]}
                            width={175}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )
    );
}

export default SimplePieChart;
