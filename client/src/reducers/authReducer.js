import {initialState} from "./reducer";
import {SET_ERROR, SET_IS_AUTH, SET_IS_REDIRECT, SET_LOADING} from "../constants/action-types";


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                isError: action.isError,
                errorMessage: action.errorMessage
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            };
        case SET_IS_REDIRECT:
            return {
                ...state,
                isRedirect: action.isRedirect
            };
        default:
            return {
                ...state
            };
    }
};

export default authReducer;