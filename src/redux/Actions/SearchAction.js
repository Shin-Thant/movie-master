import axios from "axios";
import {
    GET_SEARCH_ERROR,
    GET_SEARCH_REQUEST,
    GET_SEARCH_SUCCESS,
    REMOVE_SEARCH,
} from "../Constants/Types";

export const getSearchData = (name) => async (dispatch, getState) => {
    dispatch({ type: GET_SEARCH_REQUEST });

    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${name}`
        );

        dispatch({ type: GET_SEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_SEARCH_ERROR, payload: error.message });
    }
};

export const removeSearchData = (name) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_SEARCH });
};
