import "./Nav.scss";
import NavIcone from "../../components/NavIcone/NavIcone";
import navIcone1 from "../../assets/img/navIcone1.png";
import navIcone2 from "../../assets/img/navIcone2.png";
import navIcone3 from "../../assets/img/navIcone3.png";
import navIcone4 from "../../assets/img/navIcone4.png";

function Nav() {
    return (
        <div id="nav">
            <span id="listeNav">
                <NavIcone
                    img={navIcone1}
                    link="#"
                />
                <NavIcone
                    img={navIcone2}
                    link="#"
                />
                <NavIcone
                    img={navIcone3}
                    link="#"
                />
                <NavIcone
                    img={navIcone4}
                    link="#"
                />
            </span>
            <p>Copiryght, SportSee 2020</p>
        </div>
    );
}

export default Nav;
