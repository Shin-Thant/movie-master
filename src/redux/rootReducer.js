import { combineReducers } from "redux";
import {
    PrimaryMovieReducer,
    PrimarySeriesReducer,
} from "./Reducers/FilterReducers";
import { NavbarReducer } from "./Reducers/NavbarReducer";
import { SearchReducer } from "./Reducers/SearchReducer";
import {
    MovieListReducer,
    tvListReducer,
    WatchListReducer,
} from "./Reducers/WatchListReducer";

export const rootReducer = combineReducers({
    primaryMovieFilter: PrimaryMovieReducer,
    primarySeriesFilter: PrimarySeriesReducer,
    watchList: WatchListReducer,
    movieList: MovieListReducer,
    tvList: tvListReducer,
    search: SearchReducer,
    navbar: NavbarReducer,
});
