import {useEffect, useState} from "react";
import './Nutrition.scss';

function Nutrition(props) {
    const [data, setdata] = useState(props.data);
    const [keyName, setkeyName] = useState(props.keyName);
    const [couleur, setcouleur] = useState(null);
    const [unite, setunite] = useState(null);
    const [nutritionName, setnutritionName] = useState(null);

    useEffect(() => {
        switch (keyName) {
            case "calorieCount" :
                setcouleur("#FF00001A");
                setunite("kCal");
                setnutritionName("Calories");
            break;
            case "proteinCount" :
                setcouleur("#4AB8FF1A");
                setunite("g");
                setnutritionName("Proteines");
            break;
            case "carbohydrateCount" :
                setcouleur("#F9CE231A");
                setunite("g");
                setnutritionName("Glucides");
            break;
            case "lipidCount" :
                setcouleur("#FD51811A");
                setunite("g");
                setnutritionName("Lipides");
            break;
        }
    }, [keyName]);

    return (
        nutritionName && (
            <div id="nutritionInfos">
                <span className="icone" style={{backgroundColor: `${couleur}`}}>
                    <img src={`/img/${nutritionName}.svg`} alt=""/>
                </span>
                <span>
                    <p>{data}{unite}</p>
                    <p>{nutritionName}</p>
                </span>
            </div>
        )
    );
}

export default Nutrition;
