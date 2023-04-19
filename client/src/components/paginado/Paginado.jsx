import style from './Paginado.module.css';


const Paginated = ({ dogsPerPage, allDogs, page, currentPage }) => {
    
    const pageNumbers = [];

    // ? Math.ceil redondea hacia arriba y Math.floor hacia abajo
    for(let i = 0; i < Math.ceil(allDogs.length/dogsPerPage); i++){
        pageNumbers.push(i+1);
    }

    return(
        <nav>
            <ul className={style.pagination}>
                {
                    pageNumbers && pageNumbers.map((number) => {
                        return(
                            <li key={number}>
                                <a 
                                onClick={() => page(number)}
                                className={number === currentPage ? style.active : ""}>
                                    {number}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    );
}

export default Paginated;