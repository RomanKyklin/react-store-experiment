import {combineReducers} from "redux";
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';

export const initialState = {
    categories: [],
    isError: false,
    isLoading: true,
    products: [],
    errorMessage: '',
    title: '',
    sellingPrice: '0',
    purchasePrice: '',
    categoryId: '',
    visible: false,
    product: {},
    productIdToChange: '',
    productsCount: 0,
    perPage: 10,
    page: 1
};


export default combineReducers({
    categoryReducer,
    productReducer
});