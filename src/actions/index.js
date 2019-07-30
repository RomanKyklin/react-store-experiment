import {SET_CATEGORY, SET_ERROR} from "../constants/action-types";


export const setCategory = (categories) => {
    return {
        type: SET_CATEGORY,
        categories,
        isLoading: false
    }
};

export const setError = (isError) => {
    return {
        type: SET_ERROR,
        isError,
        isLoading: false
    }
};