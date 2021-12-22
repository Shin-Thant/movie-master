import { ADD_NEW_LINK } from "../Constants/Types";

export const addNavLink = (link) => {
    return {
        type: ADD_NEW_LINK,
        payload: link,
    };
};
