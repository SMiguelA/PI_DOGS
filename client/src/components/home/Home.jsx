import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getDogs, 
    getTemperaments, 
    filterByTemperament, 
    deleteDogs, 
    filterOrigin, 
    filterOrder, 
    filterByWeight,
} from "../../redux/actions/actions";
import img from '../../img/dogIcon.png'
import { Link } from "react-router-dom";
import style from './Home.module.css';
import Dogs from "../dogsCard/Dogs";
import Paginated from "../paginado/Paginado";
import SearchBar from "../searchBar/SearchBar";

const Home = () => {

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    
    // ? Estado local para el paginado
    // * current page
    const [currentPage, setPage] = useState(1);
    
    // * galleta
    const [rerender, setRender] = useState('');
    
    const dogsPerPage = 8;
    
    // * tomamos del primer perro hasta el ultimo para cada pagina (alldogs[0] - alldogs[7])
    const lastDogPage = currentPage * dogsPerPage;
    const firstDogPage = lastDogPage - dogsPerPage;
    const dogsPage = allDogs.slice(firstDogPage, lastDogPage);
    
    const page = (pageNumber) => {
        pageNumber !== 0 && setPage(pageNumber);
    }
    
    // * para quitar filtros
    const handlerRefresh = (event) => {
        event.preventDefault();
        dispatch(deleteDogs())
        dispatch(getDogs());
    };

    // * Handler para hacer dispatch de la accion filtrar por temperamentos
    const handlerFilterTemp = (element) => {
        element.preventDefault();
        setPage(1);
        dispatch(filterByTemperament(element.target.value))
    }

    // * Handler identificar si es de la DB o de la API
    const handlerFilterOrigin = (element) => {
        element.preventDefault();
        setPage(1);
        dispatch(filterOrigin(element.target.value))
    }

    // * Handler ordenar de mayor a menor o viceversa
    const handlerOrder = (element) => {
        element.preventDefault();
        setPage(1);
        dispatch(filterOrder(element.target.value))
        setRender(element.target.value)
    }

    // * Handler para ordewnar por peso
    const handlerWeight = (element) => {
        element.preventDefault();
        setPage(1)
        dispatch(filterByWeight(element.target.value));
        setRender(element.target.value)
    }

    return(
        <div className={style.container}>
            {/*Filtros*/}
            <div className={style.filtros}>
                <Link to='/create_breed'>
                    <button>Create Breed</button>
                </Link>
                <button onClick={handlerRefresh}>Refresh</button>
                <select name="temperaments" onChange={element => handlerFilterTemp(element)} className={style.select}>
                    <option value="all">All Temperaments</option>
                    {
                        allTemperaments?.map((temperament) => {
                            return temperament && <option value={temperament}>{temperament}</option>
                        })
                    }
                </select>
                <select name="origin" onChange={element => handlerFilterOrigin(element)} className={style.select}>
                    <option value="all">All Dogs</option>
                    <option value="apiDogs">API Dogs</option>
                    <option value="dbDogs">DB Dogs</option>
                </select>
                <select name="asc_or_desc_alphavetic" onChange={element => handlerOrder(element)} className={style.select}>
                    <option value="0" disabled selected>Slect...</option>
                    <option value="asc">Upward</option>
                    <option value="desc">Falling</option>
                </select>
                <select name="mayor_a_menor" onChange={element => handlerWeight(element)} className={style.selectWeight}>
                    <option value="0" disabled selected>Slect...</option>
                    <option value="greater_to_lesser">Greater to Lesser Weight</option>
                    <option value="lesser_to_greater">Lesser to Greater Weight</option>
                </select>

                <SearchBar setPage = {setPage} />

            </div>

            <h1>Cute naughty dogs</h1>


            {/*Renderizamos cartas*/}
            
            {
                allDogs.length && typeof dogsPage !== "string" ?
                <div className={style.paginationCont}>
                    <Paginated 
                    dogsPerPage={dogsPerPage} 
                    allDogs={allDogs}
                    page={page}
                    currentPage={currentPage}
                    />
                </div>
                : <div></div>
            }

            <div className={style.componentsContainer}>
                {
                    allDogs.length && typeof dogsPage !== "string" ? dogsPage.map((dog) => {
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
                    : typeof dogsPage === "string" 
                    ? <div>
                        <h1 className={style.errMessage}>Dog not found</h1>
                        <img src={img} alt="" />
                      </div>
                    : <h1 className={style.loading}>Loading...</h1>
                }


            </div>
            {
                allDogs.length && typeof dogsPage !== "string"
                ? <div className={style.paginationCont}>
                    <Paginated 
                    dogsPerPage={dogsPerPage} 
                    allDogs={allDogs}
                    page={page}
                    currentPage={currentPage}
                    />
                </div>

                :<div></div>
            }
        </div>
    );
};

export default Home;