import {SET_CATEGORY, SET_ERROR} from "../constants/action-types";

const initialState = {
    categories: [],
    isError: false,
    isLoading: true
};

const reducer = (state = initialState, action) => {
    if (action.type === SET_CATEGORY) {
        state.categories = action.categories;
        state.isLoading = action.isLoading;
    }
    if(action.type === SET_ERROR) {
        state.isLoading = action.isLoading;
        state.isError = action.isError;
    }
    return Object.assign({}, state);
};

export default reducer;