import {
    SET_CATEGORY, SET_CATEGORY_ID,
    SET_ERROR, SET_FILTERED_CATEGORY_ID, SET_LOADING,
    SET_PRODUCTS,
    SET_PURCHASE_PRICE,
    SET_SELLING_PRICE,
    SET_TITLE, SET_VISIBLE
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
    filteredCategoryId: '',
    visible: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            state.categories = action.categories;
            break;
        case SET_PRODUCTS:
            state.products = action.products;
            break;
        case SET_ERROR:
            state.isError = action.isError;
            state.errorMessage = action.errorMessage;
            break;
        case SET_TITLE:
            state.title = action.title;
            break;
        case SET_SELLING_PRICE:
            state.sellingPrice = action.sellingPrice;
            break;
        case SET_PURCHASE_PRICE:
            state.purchasePrice = action.purchasePrice;
            break;
        case SET_CATEGORY_ID:
            state.categoryId = action.categoryId;
            break;
        case SET_LOADING:
            state.isLoading = action.isLoading;
            break;
        case SET_FILTERED_CATEGORY_ID:
            state.filteredCategoryId = action.filteredCategoryId;
            break;
        case SET_VISIBLE:
            state.visible = action.visible;
            break;
        default:
            return state;
    }
    return Object.assign({}, state);
};

export default reducer;