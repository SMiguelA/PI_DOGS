import style from './Dogs.module.css';
import { Link } from "react-router-dom";

const Dogs = ({ID, Name, Image,Temperament, Weight}) => {
    let temperaments = Temperament?.map((temp) => temp.Name ? temp.Name : temp);
    temperaments = temperaments?.join(", ");
    if(!Array.isArray(Weight)){
        Weight = Weight.split(" - ");
    } 

    return(
        <div className={style.container} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${Image})` }}>
            <Link to={`/dogs/detail/${ID}`} className={style.link}>
                <h2>Name: <h3>{Name}</h3></h2>
                <h2>Temperament: <h3>{temperaments ? temperaments : "Null"}</h3></h2>
                <h2>Weight: <h3>{`${Weight[0]} - ${Weight[1]} kg`}</h3></h2>
            </Link>
        </div>
    );
};

export default Dogs;