import {
    GET_SEARCH_ERROR,
    GET_SEARCH_REQUEST,
    GET_SEARCH_SUCCESS,
    REMOVE_SEARCH,
} from "../Constants/Types";

export const SearchReducer = (
    state = { loading: false, data: [], error: "" },
    action
) => {
    switch (action.type) {
        case GET_SEARCH_REQUEST:
            return { loading: true, data: [], error: "" };

        case GET_SEARCH_SUCCESS:
            return { loading: false, data: action.payload, error: "" };

        case GET_SEARCH_ERROR:
            return { loading: false, data: [], error: action.payload };

        case REMOVE_SEARCH:
            return { loading: false, data: [], error: "" };

        default:
            return state;
    }
};
