import {initialState} from "./reducer";
import {
    SET_CATEGORY,
    SET_ERROR, SET_IS_REDIRECT, SET_LOADING, SET_PRODUCT,
    SET_PRODUCTS,
} from "../constants/action-types";

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                categories: action.categories
            };
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            };
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
        case SET_PRODUCT:
            return {
                ...state,
                product: action.product
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

export default categoryReducer;

