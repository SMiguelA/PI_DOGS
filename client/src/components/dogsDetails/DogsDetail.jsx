import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getDogById, deleteDogDetail } from '../../redux/actions/actions'; 
import { useEffect } from 'react';
import style from './DogsDetail.module.css';

const DogsDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getDogById(id))

        return () => {
            dispatch(deleteDogDetail());
        }
    },[id]);

    const dogDetail = useSelector(state => state.dogDetail);
    console.log(dogDetail);

    const Height = Array.isArray(dogDetail.Height) 
    ? `${dogDetail.Height[0]} - ${dogDetail.Height[1]} cm`
    : `${dogDetail.Height} cm`
    const Weight = Array.isArray(dogDetail.Weight)
    ? `${dogDetail.Weight[0]} - ${dogDetail.Weight[1]} kg`
    : `${dogDetail.Weight} kg`

    let temperaments = dogDetail.Temperaments?.map((temp) => temp.Name ? temp.Name : temp);
    temperaments = temperaments?.join(", ");

    const handlerBack = (element) => {
        element.preventDefault();
        navigate("/home")
    }

    return(
        <div className={style.container}>
            
            <div className={style.content}>
                {
                    dogDetail.Name ?
                    <div className={style.columnas}>
                        
                        <div className={style.info}>
                            <p>ID : {dogDetail.ID}</p>
                            <p>Name : {dogDetail.Name}</p>
                            <p>Height : {Height}</p>
                            <p>Weight : {Weight}</p>
                            <p>Temperaments : {temperaments}</p>
                        </div>
                        <div className={style.rightColumn}>
                            <img src={dogDetail.Image} alt="Dog Image" />
                        </div>
                    </div>
                    
                    : <h1 className={style.loading}>Loading...</h1>
                }
                <button onClick={element => handlerBack(element)}>Go Back</button>
            </div>
            
        </div>
    );
};

export default DogsDetail;