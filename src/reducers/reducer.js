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
    productIdToChange: ''
};


export default combineReducers({
    categoryReducer,
    productReducer
});