import { ADD_NEW_LINK } from "../Constants/Types";

export const NavbarReducer = (state = { activeLink: "explore" }, action) => {
    switch (action.type) {
        case ADD_NEW_LINK:
            return { activeLink: action.payload };
        default:
            return state;
    }
};
