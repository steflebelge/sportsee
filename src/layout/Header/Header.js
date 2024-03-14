import "./Header.scss";
import {Link} from "react-router-dom";
import logo from "../../assets/img/logo.png";

function Header() {

    return (
        <div id="header">
            <span id="logo">
                <img src={logo} alt="Logo"/>
                <p>SportSee</p>
            </span>
            <Link to="#">Accueil</Link>
            <Link to="#">Profil</Link>
            <Link to="#">Réglages</Link>
            <Link to="#">Communauté</Link>
        </div>
    );
}

export default Header;
