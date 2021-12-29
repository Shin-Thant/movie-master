import {
    ADD_TO_MOVIE_LIST,
    ADD_TO_TV_LIST,
    ADD_TO_WATCH_LIST,
    GET_LIST_ITEM_ERROR,
    GET_LIST_ITEM_REQUEST,
    GET_LIST_ITEM_SUCCESS,
    REMOVE_FROM_MOVIE_LIST,
    REMOVE_FROM_TV_LIST,
    REMOVE_FROM_WATCH_LIST,
} from "../Constants/Types";
import axios from "axios";

export const addToWatchList =
    (media_type, id) => async (dispatch, getState) => {
        // dispatch({ type: ADD_TO_WATCH_LIST, payload: listItem });

        dispatch({ type: GET_LIST_ITEM_REQUEST });

        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
            );

            if (data) {
                dispatch({ type: GET_LIST_ITEM_SUCCESS, payload: data });
                console.log(
                    data.original_title
                        ? data.original_title
                        : data.original_name
                );

                localStorage.setItem(
                    "movie-master",
                    JSON.stringify(getState().watchList.list)
                );

                if (media_type === "movie") {
                    dispatch({ type: ADD_TO_MOVIE_LIST, payload: data });

                    console.log("to movie list");
                    // getState().watchList.list.length &&
                    //     getState().watchList.list.map((item) => {
                    //         console.log(item);
                    //         if (item.original_title) {
                    //             console.log(item.original_title);

                    //         }
                    //     });
                    localStorage.setItem(
                        "movie-master-movies",
                        JSON.stringify(getState().movieList.movies)
                    );
                } else {
                    dispatch({ type: ADD_TO_TV_LIST, payload: data });
                    console.log("to tv list");
                    // getState().watchList.list.map((item) => {
                    //     if (item.original_name) {
                    //         console.log(item.original_name);

                    //     }
                    // });
                    localStorage.setItem(
                        "movie-master-tv",
                        JSON.stringify(getState().tvList.tv)
                    );
                }
            }
        } catch (error) {
            dispatch({ type: GET_LIST_ITEM_ERROR, payload: error.message });
        }
    };

export const removeFromWatchList = (itemId) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_WATCH_LIST, payload: itemId });

    // getState().movieList.movies?.length &&
    dispatch({ type: REMOVE_FROM_MOVIE_LIST, payload: itemId });

    // getState().movieList.tv?.length &&
    dispatch({ type: REMOVE_FROM_TV_LIST, payload: itemId });

    localStorage.setItem(
        "movie-master",
        JSON.stringify(getState().watchList.list)
    );

    getState().movieList.movies?.length &&
        localStorage.setItem(
            "movie-master-movies",
            JSON.stringify(getState().movieList.movies)
        );

    getState().movieList.tv?.length &&
        localStorage.setItem(
            "movie-master-tv",
            JSON.stringify(getState().tvList.tv)
        );
};
