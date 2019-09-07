import {combineReducers} from "redux";
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__INITIAL_STATE__;

// Allow the passed state to be garbage-collected
delete window.__INITIAL_STATE__;

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
    isAuth: preloadedState.isAuth || false
};

export default combineReducers({
    categoryReducer,
    productReducer,
    authReducer
});