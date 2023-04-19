import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions/actions";
import style from './Home.module.css';
import Dogs from "../dogsCard/Dogs";
import Paginated from "../paginado/Paginado";

const Home = () => {

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch]);

    const handlerRefresh = (event) => {
        event.preventDefault();
        dispatch(getDogs());
    };

    // ? Estado local para el paginado
    // * current page
    const [currentPage, setPage] = useState(1);

    const dogsPerPage = 8;

    // * tomamos del primer perro hasta el ultimo para cada pagina (alldogs[0] - alldogs[7])
    const lastDogPage = currentPage * dogsPerPage;
    const firstDogPage = lastDogPage - dogsPerPage;
    const dogsPage = allDogs.slice(firstDogPage, lastDogPage);

    console.log(dogsPage.length);

    const page = (pageNumber) => {
        pageNumber !== 0 && setPage(pageNumber);
    }

    return(
        <div className={style.container}>
            <h1>Cute naughty dogs</h1>

            <button onClick={handlerRefresh}>Refresh</button>

            {/*Filtros*/}
            <div>
                <select name="temperaments">
                    
                </select>
                <select name="asc_or_desc_alphavetic">
                    <option value="asc">Upward</option>
                    <option value="desc">Falling</option>
                </select>
            </div>

            {/*Renderizamos cartas*/}
            
            <div className={style.paginationCont}>
                <Paginated 
                dogsPerPage={dogsPerPage} 
                allDogs={allDogs}
                page={page}
                currentPage={currentPage}
                />
            </div>

            <div className={style.componentsContainer}>
                {
                    dogsPage?.map((dog) => {
                        return(
                            <Dogs
                            key={dog.ID}
                            ID={dog.ID}
                            Name={dog.Name}
                            Image={dog.Image}
                            Temperament={dog.Temperaments}
                            Weight={dog.Weight}
                            />
                        );
                    })
                }


            </div>
            
            <div className={style.paginationCont}>
                <Paginated 
                dogsPerPage={dogsPerPage} 
                allDogs={allDogs}
                page={page}
                currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default Home;