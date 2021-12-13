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
    SERIES_ACTIVE,
    SERIES_INACTIVE,
} from "../Constants/Types";

export const PrimaryMovieReducer = (
    state = {
        movieStatus: true,
        movieLoading: false,
        movieGenreIds: [],
        movies: [],
    },
    action
) => {
    switch (action.type) {
        case MOVIE_ACTIVE:
            return {
                movieStatus: true,
                movieLoading: false,
                movieGenreIds: [...state.movieGenreIds],
                movies: [],
            };

        case MOVIE_INACTIVE:
            return {
                movieStatus: false,
                movieLoading: false,
                movieGenreIds: [],
                movies: [],
            };

        case ADD_MOVIE_FILTER:
            return {
                movieStatus: state.movieStatus,
                movieLoading: false,
                movieGenreIds: [...state.movieGenreIds, action.payload],
                movies: [],
            };

        case GET_MOVIE_TYPE_REQUEST:
            return {
                movieStatus: state.movieStatus,
                movieLoading: true,
                movieGenreIds: [...state.movieGenreIds],
                movies: [],
            };

        case GET_MOVIE_TYPE_SUCCESS:
            return {
                movieStatus: state.movieStatus,
                movieLoading: false,
                movieGenreIds: [...state.movieGenreIds],
                movies: action.payload,
            };

        case GET_MOVIE_TYPE_ERROR:
            return {
                movieStatus: state.movieStatus,
                movieLoading: false,
                movieGenreIds: [...state.movieGenreIds],
                movies: [],
                error: action.payload,
            };

        case REMOVE_MOVIE_FILTER:
            return {
                movieStatus: state.movieStatus,
                movieLoading: false,
                movieGenreIds: state.movieGenreIds.filter(
                    (item) => item !== action.payload
                ),
                movies: [],
            };

        default:
            return state;
    }
};

export const PrimarySeriesReducer = (
    state = {
        seriesStatus: false,
        seriesLoading: false,
        seriesGenreIds: [],
        series: [],
    },
    action
) => {
    switch (action.type) {
        case SERIES_ACTIVE:
            return {
                seriesStatus: true,
                seriesLoading: false,
                seriesGenreIds: [...state.seriesGenreIds],
                series: [],
            };

        case SERIES_INACTIVE:
            return {
                seriesStatus: false,
                seriesLoading: false,
                seriesGenreIds: [],
                series: [],
            };

        case ADD_SERIES_FILTER:
            return {
                seriesStatus: state.seriesStatus,
                seriesLoading: false,
                seriesGenreIds: [...state.seriesGenreIds, action.payload],
                series: [],
            };

        case REMOVE_SERIES_FILTER:
            return {
                seriesStatus: state.seriesStatus,
                seriesLoading: state.seriesLoading,
                seriesGenreIds: state.seriesGenreIds.filter((item) => {
                    console.log(item);
                    return item !== action.payload;
                }),
                series: [],
            };

        case GET_SERIES_TYPE_REQUEST:
            return {
                seriesStatus: state.seriesStatus,
                seriesLoading: true,
                seriesGenreIds: [...state.seriesGenreIds],
                series: [],
            };

        case GET_SERIES_TYPE_SUCCESS:
            return {
                seriesStatus: state.seriesStatus,
                seriesLoading: false,
                seriesGenreIds: [...state.seriesGenreIds],
                series: action.payload,
            };

        case GET_SERIES_TYPE_ERROR:
            return {
                seriesLoading: false,
                seriesGenreIds: [...state.seriesGenreIds],
                series: [],
                error: action.payload,
            };

        default:
            return state;
    }
};
