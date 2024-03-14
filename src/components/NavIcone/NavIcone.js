import {Link} from "react-router-dom";
import {useState} from "react";
import "./NavIcone.scss";

function NavIcone(props) {
    const [img, setImg] = useState(props.img);
    const [lien, setLien] = useState(props.link);

    return(
        <Link id="navIcone">
            <img src={img} alt={lien}/>
        </Link>
    );
}

export default NavIcone;
