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

export const WatchListReducer = (
    state = { loading: false, list: [] },
    action
) => {
    switch (action.type) {
        case GET_LIST_ITEM_REQUEST:
            return { loading: true, list: [...state.list] };

        case GET_LIST_ITEM_SUCCESS:
            const newItem = action.payload;

            const existedItem = state.list.find(
                (item) => item.id === newItem.id
            );

            if (existedItem) {
                return {
                    loading: false,
                    list: state.list.map((item) =>
                        item.id === newItem.id ? newItem : item
                    ),
                };
            } else {
                return { loading: false, list: [...state.list, newItem] };
            }

        case GET_LIST_ITEM_ERROR:
            return { loading: false, list: [], error: action.payload };

        case REMOVE_FROM_WATCH_LIST:
            return {
                list: state.list.filter((item) => item.id !== action.payload),
            };

        default:
            return state;
    }
};

export const MovieListReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case ADD_TO_MOVIE_LIST:
            const newItem = action.payload;

            const existedItem = state.movies.find(
                (item) => item.id === newItem.id
            );

            if (existedItem) {
                return {
                    movies: state.movies.map((item) =>
                        item.id === newItem.id ? newItem : item
                    ),
                };
            } else {
                return { movies: [...state.movies, newItem] };
            }

        case REMOVE_FROM_MOVIE_LIST:
            return {
                movies: state.movies.filter(
                    (item) => item.id !== action.payload
                ),
            };

        default:
            return state;
    }
};

export const tvListReducer = (state = { tv: [] }, action) => {
    switch (action.type) {
        case ADD_TO_TV_LIST:
            const newItem = action.payload;

            const existedItem = state.tv.find((item) => item.id === newItem.id);

            if (existedItem) {
                return {
                    tv: state.tv.map((item) =>
                        item.id === newItem.id ? newItem : item
                    ),
                };
            } else {
                return { tv: [...state.tv, newItem] };
            }

        case REMOVE_FROM_TV_LIST:
            return {
                tv: state.tv.filter((item) => item.id !== action.payload),
            };

        default:
            return state;
    }
};
