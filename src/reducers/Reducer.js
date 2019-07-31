import {
    SET_CATEGORY, SET_CATEGORY_ID,
    SET_ERROR,
    SET_PRODUCTS,
    SET_PURCHASE_PRICE,
    SET_SELLING_PRICE,
    SET_TITLE
} from "../constants/action-types";

const initialState = {
    categories: [],
    isError: false,
    isLoading: true,
    products: [],
    errorMessage: '',
    title: '',
    sellingPrice: '0',
    purchasePrice: '',
    categoryId: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            state.categories = action.categories;
            state.isLoading = action.isLoading;
            break;
        case SET_PRODUCTS:
            state.isLoading = action.isLoading;
            state.products = action.products;
            break;
        case SET_ERROR:
            state.isLoading = action.isLoading;
            state.isError = action.isError;
            state.errorMessage = action.errorMessage;
            break;
        case SET_TITLE:
            state.isLoading = action.isLoading;
            state.title = action.title;
            break;
        case SET_SELLING_PRICE:
            state.isLoading = action.isLoading;
            state.sellingPrice = action.sellingPrice;
            break;
        case SET_PURCHASE_PRICE:
            state.isLoading = action.isLoading;
            state.purchasePrice = action.purchasePrice;
            break;
        case SET_CATEGORY_ID:
            state.isLoading = action.isLoading;
            state.categoryId = action.categoryId;
            break;
        default:
            return state;
    }
    return Object.assign({}, state);
};

export default reducer;