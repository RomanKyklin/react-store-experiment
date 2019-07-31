import {
    SET_CATEGORY, SET_CATEGORY_ID,
    SET_ERROR,
    SET_PRODUCTS,
    SET_PURCHASE_PRICE,
    SET_SELLING_PRICE,
    SET_TITLE
} from "../constants/action-types";
import axios from "axios";

var _ = require('lodash');

const GET_CATEGORIES_URL = 'http://localhost:3000/categories';
const GET_PRODUCTS_URL = 'http://localhost:3000/products';

export const setCategory = (categories) => {
    return {
        type: SET_CATEGORY,
        categories,
        isLoading: false
    }
};

export const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        products,
        isLoading: false
    }
};

export const setError = (isError, errorMessage = '') => {
    return {
        type: SET_ERROR,
        isError,
        isLoading: false,
        errorMessage
    }
};

export const setTitle = (title) => {
    return {
        type: SET_TITLE,
        isLoading: false,
        title
    }
};

export const setSellingPrice = (sellingPrice) => {
    return {
        type: SET_SELLING_PRICE,
        isLoading: false,
        sellingPrice
    }
};

export const setPurchasePrice = (purchasePrice) => {
    return {
        type: SET_PURCHASE_PRICE,
        purchasePrice,
        isLoading: false,
    }
};

export const setCategoryId = (categoryId) => {
  return {
      type: SET_CATEGORY_ID,
      categoryId,
      isLoading: false
  }
};

export const fetchCategories = () => {
    return (dispatch) => {
        return axios.get(GET_CATEGORIES_URL)
            .then(response => {
                const categories = _.get(response, 'data', []);

                if (!_.isArray(categories)) {
                    dispatch(setError(true));
                    return;
                }
                dispatch(setCategory(categories));
            })
            .catch(error => {
                dispatch(setError(true));
            });
    }
};

export const fetchProducts = () => {
    return (dispatch) => {
        return axios.get(GET_PRODUCTS_URL)
            .then(response => {
                const products = _.get(response, 'data', []);

                if (!_.isArray(products)) {
                    dispatch(setError(true));
                    return;
                }
                dispatch(setProducts(products));
            })
            .catch(error => {
                // handle error
                console.log(error);
                dispatch(setError(true));
            });
    }
};