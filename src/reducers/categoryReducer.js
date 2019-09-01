import {initialState} from "./reducer";
import {
    SET_CATEGORY, SET_CATEGORY_ID,
    SET_ERROR, SET_LOADING, SET_PRODUCT, SET_PRODUCT_ID_TO_CHANGE,
    SET_PRODUCTS,
    SET_PURCHASE_PRICE,
    SET_SELLING_PRICE,
    SET_TITLE, SET_VISIBLE
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
        case SET_VISIBLE:
            return {
                ...state,
                visible: action.visible
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
        default:
            return {
                ...state
            };
    }
};

export default categoryReducer;

