import axios from 'axios';

export const GET_USER = "GET_USER";
export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_BY_ID = "GET_DOGS_BY_ID";
export const GET_DOGS_NAME = "GET_DOGS_NAME";
export const POST_DOGS = "POST_DOGS";
export const ERROR_DOGS_NAME = "ERROR_DOGS_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const DELETE_DOGS = "DELETE_DOGS";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const DELETE_DOGS_DETAIL = "DELETE_DOGS_DETAIL";

export const setUsername = (username) => {
    return { type: GET_USER, payload: username };
};

export const getDogs = () => {
    return async (dispatch) => {
        let dogs = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: GET_DOGS,
            payload: dogs.data
        })
    }
};

export const getDogById = (id) => {
    return async (dispatch) => {
        try {
            const dogDetail = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: GET_DOGS_BY_ID,
                payload: dogDetail.data
            });
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const createDogs = (data) => {
    return async (dispatch) => {
        try{
            let dog = await axios.post('http://localhost:3001/dogs', data);
            return dispatch({
                type: POST_DOGS,
                payload: dog.data
            })
        }
        catch(err){
            console.log(err.message);
        }
    }
};

export const getTemperaments = () => {
    return async (dispatch) => {
        let temperaments = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: temperaments.data
        })
    }
};

export const searchName = (value) => {
    return async (dispatch) => {
        try {
            const dogName = await axios.get(`http://localhost:3001/dogs?name=${value}`);
            return dispatch({
                type: GET_DOGS_NAME,
                payload: dogName.data
            })
        } catch (error) {
            return dispatch({
                type: ERROR_DOGS_NAME,
                payload: error.message
            })
        }
    }
}

export const filterByTemperament = (value) => {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload: value
    }
};

export const filterOrigin = (value) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: value
    }
};

export const filterOrder = (value) => {
    return {
        type: FILTER_BY_ORDER,
        payload: value
    }
};

export const filterByWeight = (value) => {
    return {
        type:FILTER_BY_WEIGHT,
        payload: value
    }
}

export const deleteDogs = () => {
    return {
        type: DELETE_DOGS
    }
};

export const deleteDogDetail = () => {
    return{
        type: DELETE_DOGS_DETAIL
    }
};

