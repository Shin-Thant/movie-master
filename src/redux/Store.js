import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    watchList: {
        list: localStorage.getItem("movie-master")
            ? JSON.parse(localStorage.getItem("movie-master"))
            : [],
    },
    movieList: {
        movies: localStorage.getItem("movie-master-movies")
            ? JSON.parse(localStorage.getItem("movie-master-movies"))
            : [],
    },
    tvList: {
        tv: localStorage.getItem("movie-master-tv")
            ? JSON.parse(localStorage.getItem("movie-master-tv"))
            : [],
    },
};

export const Store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
