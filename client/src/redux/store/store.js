import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(
    rootReducer,
    composeEnhacer(applyMiddleware(thunkMiddleware))
);

export default store;