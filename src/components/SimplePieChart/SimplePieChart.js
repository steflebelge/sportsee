import {useEffect, useState} from "react";
import {ResponsiveContainer, PieChart, Pie, Legend, Cell} from "recharts";
import "./SimplePieChart.scss";

function SimplePieChart(props) {
    const [cleanData, setCleanData] = useState(null);
    const COLORS = ['#E60000', '#fff0'];
    const [error, setError] = useState("Loading...");

    useEffect(() => {
        if (cleanData)
            return;

        if (!props || !props.data) {
            setError("No data");
            return;
        }

        setError(null);
        let dataTmp = [];
        dataTmp[0] = props.data;
        dataTmp[1] = {"todayScore": 100 - props.data.todayScore};

        // console.log("SimplePieChart set data");
        setCleanData(dataTmp);
    }, [props]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
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
                                        <Cell key={`cell-${index}`} stroke={"none"} fill={COLORS[index % COLORS.length]}/>
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
                ))}
        </>
    );
}

export default SimplePieChart;
