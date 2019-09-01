import {combineReducers} from "redux";
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import { reducer as formReducer } from 'redux-form'

export const initialState = {
    categories: [],
    isError: false,
    isLoading: true,
    products: [],
    errorMessage: '',
    visible: false,
    product: {},
    productIdToChange: '',
    productsCount: 0,
    perPage: 10,
    page: 1
};


export default combineReducers({
    categoryReducer,
    productReducer,
    form: formReducer
});