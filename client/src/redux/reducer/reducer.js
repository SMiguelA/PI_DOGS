import { GET_USER, GET_DOGS } from '../actions/actions';

const iniState = {
    username: "",
    dogs: []
};

const rootReducer = (state = iniState, action) => {
    switch(action.type){
        case GET_USER:
            return { ...state, username: action.payload };
        case GET_DOGS:
            return { ...state, dogs: action.payload }
        default:
            return { ...state };
    }
};

export default rootReducer; 