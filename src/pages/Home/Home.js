import "./Home.scss";

function Home() {

    return (
        <div id="home">
            <span id="top">Bonjour</span>
            <span id="bottom">
                <span id="gauche">
                    <span id="un" className="ligne">GRAPHE</span>
                    <span id="deux" className="ligne">
                        <span className="graphe">1</span>
                        <span className="graphe">2</span>
                        <span className="graphe">3</span>
                    </span>
                </span>
                <span id="droite">
                    <span className="ligneInfos">1</span>
                    <span className="ligneInfos">2</span>
                    <span className="ligneInfos">3</span>
                    <span className="ligneInfos">4</span>
                </span>
            </span>
        </div>
    );
}

export default Home;
