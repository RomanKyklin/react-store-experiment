import {initialState} from "./reducer";
import {
    SET_CATEGORY, SET_ERROR, SET_LOADING, SET_PAGE, SET_PER_PAGE, SET_PRODUCT, SET_PRODUCT_ID_TO_CHANGE,
    SET_PRODUCTS, SET_PRODUCTS_COUNT,
} from "../constants/action-types";

const productReducer = (state = initialState, action) => {
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
        case SET_PRODUCT_ID_TO_CHANGE:
            return {
                ...state,
                productIdToChange: action.productIdToChange
            };
        case SET_PRODUCTS_COUNT:
            return {
                ...state,
                productsCount: action.productsCount
            };
        case SET_PER_PAGE:
            return {
                ...state,
                perPage: action.perPage
            };
        case SET_PAGE:
            return {
                ...state,
                page: action.page
            };
        default:
            return {
                ...state
            };
    }
};

export default productReducer;

