import {combineReducers} from "redux";
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';

export const initialState = {
    categories: [],
    isError: false,
    isLoading: false,
    products: [],
    errorMessage: '',
    title: '',
    sellingPrice: '0',
    purchasePrice: '',
    categoryId: '',
    product: {},
    productsCount: 0,
    perPage: 10,
    page: 1,
    isAuth: false
};


export default combineReducers({
    categoryReducer,
    productReducer,
    authReducer
});