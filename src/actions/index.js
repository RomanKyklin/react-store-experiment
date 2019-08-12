import {
    SET_CATEGORY, SET_CATEGORY_ID,
    SET_ERROR, SET_FILTERED_CATEGORY_ID, SET_LOADING, SET_PRODUCT, SET_PRODUCT_ID_TO_CHANGE,
    SET_PRODUCTS,
    SET_PURCHASE_PRICE,
    SET_SELLING_PRICE,
    SET_TITLE, SET_VISIBLE
} from "../constants/action-types";
import axios from "axios";
import _ from "lodash";
import {GET_CATEGORIES_URL, GET_OR_DELETE_PRODUCT_URL, GET_PRODUCTS_URL} from "../constants/app-contants";

const makeActionCreator = (type, ...argNames) => (...args) => {
    const action = {type};
    argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index]
    });
    return action
};

export const setCategory = makeActionCreator(SET_CATEGORY, 'categories');

export const setProducts = makeActionCreator(SET_PRODUCTS, 'products');

export const setError = makeActionCreator(SET_ERROR, 'isError', 'errorMessage');

export const setTitle = makeActionCreator(SET_TITLE, 'title');

export const setSellingPrice = makeActionCreator(SET_SELLING_PRICE, 'sellingPrice');

export const setPurchasePrice = makeActionCreator(SET_PURCHASE_PRICE, 'purchasePrice');

export const setCategoryId = makeActionCreator(SET_CATEGORY_ID, 'categoryId');

export const setLoading = makeActionCreator(SET_LOADING, 'isLoading');

export const setFilteredCategoryId = makeActionCreator(SET_FILTERED_CATEGORY_ID, 'filteredCategoryId');

export const setVisible = makeActionCreator(SET_VISIBLE, 'visible');

export const setProduct = makeActionCreator(SET_PRODUCT, 'product');

export const setProductIdToChange = makeActionCreator(SET_PRODUCT_ID_TO_CHANGE, 'productIdToChange');

export const fetchCategories = () => dispatch => {
    dispatch(setLoading(true));

    return axios.get(GET_CATEGORIES_URL)
        .then(response => {
            const categories = _.get(response, 'data', []);

            if (!_.isArray(categories)) {
                dispatch(setError(true));
                return;
            }
            dispatch(setCategory(categories));
        })
        .then(() => dispatch(setLoading(false)))
        .catch(error => {
            console.log(error);
            dispatch(setError(true, 'Произошла ошибка, попробуйте перезагрузить интернет или перезагрузить страницу'));
        });
};

export const fetchProducts = () => dispatch => {
    dispatch(setLoading(true));

    return axios.get(GET_PRODUCTS_URL)
        .then(response => {
            const products = _.get(response, 'data', []);

            if (!_.isArray(products)) {
                dispatch(setError(true));
                return;
            }
            dispatch(setProducts(products));
        })
        .then(() => dispatch(setLoading(false)))
        .catch(error => {
            // handle error
            console.log(error);
            dispatch(setError(true));
        });
};
