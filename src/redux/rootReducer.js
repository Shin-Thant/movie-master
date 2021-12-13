import { combineReducers } from "redux";
import {
    PrimaryMovieReducer,
    PrimarySeriesReducer,
} from "./Reducers/FilterReducers";

export const rootReducer = combineReducers({
    primaryMovieFilter: PrimaryMovieReducer,
    primarySeriesFilter: PrimarySeriesReducer,
});
