import {useEffect, useState} from "react";
import {fetchData} from "../../utils/apiCommunication";
import Nutrition from "../../components/Nutrition/Nutrition";
import SimpleBarChart from "../../components/SimpleBarChart/SimpleBarChart";
import SimpleLineChart from "../../components/SimpleLineChart/SimpleLineChart";
import SimplePieChart from "../../components/SimplePieChart/SimplePieChart";
import SimpleRadarChart from "../../components/SimpleRadarChart/SimpleRadarChart";
import "./Home.scss";

function Home() {
    const [userId, setUserId] = useState(18);
    const [USER_MAIN_DATA, setUSER_MAIN_DATA] = useState(null);
    const [USER_ACTIVITY, setUSER_ACTIVITY] = useState(null);
    const [USER_AVERAGE_SESSIONS, setUSER_AVERAGE_SESSIONS] = useState(null);
    const [USER_PERFORMANCE, setUSER_PERFORMANCE] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    let allDatas = [
        "USER_ACTIVITY",
        "USER_AVERAGE_SESSIONS",
        "USER_PERFORMANCE",
        "USER_MAIN_DATA",
    ];

    //récuperation des données utilisateur au chargmenent de la page
    useEffect(() => {
        allDatas.forEach(function (datatTmp) {
            // console.log('appel fetchData ' + datatTmp);

            fetchData(userId, datatTmp)
                .then(res => {
                    // console.log('retour then fetchData ' + datatTmp);
                    switch (datatTmp) {
                        case "USER_MAIN_DATA" :
                            if(USER_MAIN_DATA !== null)
                                return;
                            // console.log("setData : USER_MAIN_DATA");
                            res.todayScore = res.todayScore * 100;
                            setUSER_MAIN_DATA(res);
                            break;
                        case "USER_ACTIVITY" :
                            if(USER_ACTIVITY !== null)
                                return;
                            // console.log("setData : USER_ACTIVITY");
                            setUSER_ACTIVITY(res);
                            break;
                        case "USER_AVERAGE_SESSIONS" :
                            if(USER_AVERAGE_SESSIONS !== null)
                                return;
                            // console.log("setData : USER_AVERAGE_SESSIONS");
                            setUSER_AVERAGE_SESSIONS(res);
                            break;
                        case "USER_PERFORMANCE" :
                            if(USER_PERFORMANCE !== null)
                                return;
                            // console.log("setData : USER_PERFORMANCE");
                            setUSER_PERFORMANCE(res);
                            break;
                        default:
                            console.log("defaut");
                            break;
                    }
                })
                .catch(err => {
                    console.log('retour catch fetchData ' + datatTmp + " : " + err.toString());
                    setFetchError(err.toString());
                });
        });
    }, []);

    return (
        <div id="home">
            {fetchError ? (
                //si erreur on l'affiche
                <h1>{fetchError}</h1>
            ) : ((USER_MAIN_DATA
                && USER_ACTIVITY
                && USER_AVERAGE_SESSIONS
                && USER_PERFORMANCE) ? (
                <>
                    {/*Si toutes les données ont été correctement chargées on affiche le dashboard*/}
                    <span id="top">Bonjour <span>{USER_MAIN_DATA.userInfos.firstName}</span>
                        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p></span>
                    <span id="bottom">
                    <span id="gauche">
                        <span id="un" className="ligne backGround">
                            <p>
                                Activité quotidienne <br></br>
                                <span>Calories brûlées (kCal)</span>
                                <span>Poids (kg)</span>
                            </p>
                            <SimpleBarChart
                                data={USER_ACTIVITY.sessions}
                            />
                        </span>
                        <span id="deux" className="ligne">
                            <span className="graphe">
                                <SimpleLineChart
                                    data={USER_AVERAGE_SESSIONS.sessions}
                                />
                            </span>
                            <span className="graphe" style={{backgroundColor: "#282D30", borderRadius: 5}}>
                                    <SimpleRadarChart
                                        data={USER_PERFORMANCE}
                                    />
                            </span>
                            <span className="graphe backGround">
                                <SimplePieChart
                                    data={USER_MAIN_DATA}
                                />
                            </span>
                        </span>
                    </span>
                        <span id="droite">
                        {Object.keys(USER_MAIN_DATA.keyData).map((key, i) => (
                            <Nutrition
                                data={USER_MAIN_DATA.keyData[key]}
                                keyName={key}
                                key={i}
                            />
                        ))}
                    </span>
                 </span>
                </>
            ) : (
                //Sinon on affiche le loader
                <div className="loader"/>
            ))}
        </div>
    );
}

export default Home;


// - verif avancée Notion
//      : #11 : L’axe des abscisses correspond aux jours du mois courant.
//      : #12 : L’axe des abscisses correspond à la durée moyenne des sessions. != maquettes
//      : #5 et #8 : meme route, différentes infos attendues
//      : #6 et #10 : : meme route, différentes infos attendues

// - verif mise en situation
//      : documentes ton projet ( Readme, de la JSDoc)

// - preparation Soutenance

