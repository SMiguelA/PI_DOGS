import { 
    GET_USER,
    GET_DOGS, 
    GET_TEMPERAMENTS, 
    FILTER_BY_TEMPERAMENT, 
    DELETE_DOGS, 
    FILTER_BY_ORIGIN, 
    FILTER_BY_ORDER, 
    FILTER_BY_WEIGHT,
    GET_DOGS_NAME,
    ERROR_DOGS_NAME,
    GET_DOGS_BY_ID,
    DELETE_DOGS_DETAIL
} from '../actions/actions';

const iniState = {
    username: "",
    dogs: [],       // almacen en el que va trabajando cada filtro
    copyDogs: [],   //almacen con todos los datos en todo momento, no se modifica con los filtros
    temperaments: [],
    dogDetail: {}
};

const rootReducer = (state = iniState, action) => {
    switch(action.type){
        case GET_USER:
            return { ...state, username: action.payload };

        case GET_DOGS:
            return { ...state, dogs: action.payload, copyDogs: action.payload };

        case GET_DOGS_BY_ID:
            return { ...state, dogDetail: action.payload }

        case GET_DOGS_NAME:
            state.dogs = action.payload
            console.log(state.dogs);
            return { ...state, dogs: action.payload, copyDogs: action.payload }

        case ERROR_DOGS_NAME:
            return { ...state, dogs: action.payload }

        case GET_TEMPERAMENTS:
            let temperamentsName = action.payload.map(temperament => temperament.Name);
            return { ...state, temperaments: temperamentsName.sort() };

        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.copyDogs;
            const temperamentsFilter = action.payload === "all" ? allDogs : allDogs.filter(dog => dog.Temperaments?.includes(action.payload))
            return { ...state,  dogs: temperamentsFilter}

        case FILTER_BY_ORIGIN:
            console.log(state.dogs);
            const allDogsCopy = state.copyDogs;
            const originFilter = action.payload === "dbDogs" ? allDogsCopy.filter(dog => dog.CreatedInDB) : allDogsCopy.filter(dog => !dog.CreatedInDB)
            return { ...state, dogs: action.payload === "all" ? state.copyDogs : originFilter }

        case FILTER_BY_ORDER:
            console.log(state.dogs);
            const arrOrdenado = action.payload === "asc" ?  state.copyDogs.sort((a, b) => {
                if(a.Name > b.Name){
                    return 1;   // significa que es mayor alfabeticamente
                }
                if(a.Name < b.Name){
                    return -1;  // significa que es menor alfabeticamente
                }
                return 0;   // significa que son iguales
                
            }) : state.copyDogs.sort((a, b) => {
                if(a.Name > b.Name){
                    return -1;
                }
                if(a.Name < b.Name){
                    return 1;
                }
                return 0;
                
            })
            return { ...state, dogs: arrOrdenado }

        case FILTER_BY_WEIGHT:
            const dogs = state.copyDogs;
            let arrDogsArreglado = dogs.map((dog) => {
                if(Array.isArray(dog.Weight)) return dog;
                let Weight = dog.Weight.split(" - ")
                return { ...dog, Weight }
            })
            arrDogsArreglado = arrDogsArreglado.filter(dog => dog.Weight[0] != "NaN")
            console.log(arrDogsArreglado);
            const orderDogs = action.payload === "greater_to_lesser" 
            ? arrDogsArreglado.sort((a, b) => Number(b.Weight[0]) - Number(a.Weight[0]))
            : arrDogsArreglado.sort((a, b) => Number(a.Weight[0]) - Number(b.Weight[0]))

            return { ...state, dogs: orderDogs }

        case DELETE_DOGS:
            return { ...state, copyDogs:[], dogs:[], dogDetail:{} }

        case DELETE_DOGS_DETAIL:
            return{ ...state, dogDetail:{} }

        default:
            return { ...state };
    }
};

export default rootReducer; 