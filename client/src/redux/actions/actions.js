import axios from 'axios';

export const GET_USER = "GET_USER";
export const GET_DOGS = "GET_DOGS";

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