import axios from "axios";
import {
    ADD_MOVIE_FILTER,
    ADD_SERIES_FILTER,
    GET_MOVIE_TYPE_ERROR,
    GET_MOVIE_TYPE_REQUEST,
    GET_MOVIE_TYPE_SUCCESS,
    GET_SERIES_TYPE_ERROR,
    GET_SERIES_TYPE_REQUEST,
    GET_SERIES_TYPE_SUCCESS,
    MOVIE_ACTIVE,
    MOVIE_INACTIVE,
    REMOVE_MOVIE_FILTER,
    REMOVE_SERIES_FILTER,
    RESET_FILTER,
    SERIES_ACTIVE,
    SERIES_INACTIVE,
} from "../Constants/Types";

export const addMovieType = (id) => async (dispatch, getState) => {
    dispatch({ type: ADD_MOVIE_FILTER, payload: id });

    dispatch({ type: GET_MOVIE_TYPE_REQUEST });
    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=6e5732eb802fd488937cc99050f86e2c&with_genres=${getState().primaryMovieFilter.movieGenreIds.map(
                (item) => `${item},`
            )}`
        );

        dispatch({
            type: GET_MOVIE_TYPE_SUCCESS,
            payload: data.results ? data.results : [],
        });
    } catch (error) {
        dispatch({ type: GET_MOVIE_TYPE_ERROR, payload: error.message });
    }
};

export const removeMovieType = (id) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_MOVIE_FILTER, payload: id });

    dispatch({ type: GET_MOVIE_TYPE_REQUEST });
    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=6e5732eb802fd488937cc99050f86e2c&with_genres=${getState().primaryMovieFilter.movieGenreIds.map(
                (item) => `${item},`
            )}`
        );

        dispatch({
            type: GET_MOVIE_TYPE_SUCCESS,
            payload: data.results ? data.results : [],
        });
    } catch (error) {
        dispatch({ type: GET_MOVIE_TYPE_ERROR, payload: error.message });
    }
};

export const addSeriesType = (id) => async (dispatch, getState) => {
    dispatch({ type: ADD_SERIES_FILTER, payload: id });

    dispatch({ type: GET_SERIES_TYPE_REQUEST });
    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=6e5732eb802fd488937cc99050f86e2c&with_genres=${getState().primarySeriesFilter.seriesGenreIds.map(
                (item) => `${item},`
            )}`
        );

        console.log(data);

        dispatch({
            type: GET_SERIES_TYPE_SUCCESS,
            payload: data.results ? data.results : [],
        });
    } catch (error) {
        dispatch({ type: GET_SERIES_TYPE_ERROR, payload: error.message });
    }
};

export const removeSeriesType = (id) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_SERIES_FILTER, payload: id });

    dispatch({ type: GET_SERIES_TYPE_REQUEST });
    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=6e5732eb802fd488937cc99050f86e2c&with_genres=${getState().primarySeriesFilter.seriesGenreIds.map(
                (item) => `${item},`
            )}`
        );

        dispatch({
            type: GET_SERIES_TYPE_SUCCESS,
            payload: data.results ? data.results : [],
        });
    } catch (error) {
        dispatch({ type: GET_SERIES_TYPE_ERROR, payload: error.message });
    }
};

export const changeStatus = (type) => async (dispatch) => {
    if (type === "movie") {
        dispatch({ type: MOVIE_ACTIVE });
        dispatch({ type: SERIES_INACTIVE });
    } else if (type === "series") {
        dispatch({ type: SERIES_ACTIVE });
        dispatch({ type: MOVIE_INACTIVE });
    }
};
