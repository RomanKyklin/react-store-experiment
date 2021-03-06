import {
    SET_CATEGORY,
    SET_ERROR, SET_FILTERED_CATEGORY_ID, SET_IS_AUTH, SET_IS_REDIRECT, SET_LOADING, SET_PAGE, SET_PER_PAGE, SET_PRODUCT,
    SET_PRODUCTS, SET_PRODUCTS_COUNT,
} from "../constants/action-types";
import axios from "axios";
import _ from "lodash";
import {
    DEFAULT_ERROR_MESSAGE, FIELD_ERROR,
    GET_OR_ADD_OR_DELETE_CATEGORIES_URL, GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL,
    GET_OR_DELETE_PRODUCT_URL, GET_PRODUCTS_URL
} from "../constants/app-contants";
import store from "../store/store";

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

export const setLoading = makeActionCreator(SET_LOADING, 'isLoading');

export const setPage = makeActionCreator(SET_PAGE, 'page');

export const setProductsCount = makeActionCreator(SET_PRODUCTS_COUNT, 'productsCount');

export const setPerPage = makeActionCreator(SET_PER_PAGE, 'perPage');

export const setIsAuth = makeActionCreator(SET_IS_AUTH, 'isAuth');

export const setFilteredCategoryId = makeActionCreator(SET_FILTERED_CATEGORY_ID, 'filteredCategoryId');

export const setIsRedirect = makeActionCreator(SET_IS_REDIRECT, 'isRedirect');

export const setProduct = makeActionCreator(SET_PRODUCT, 'product');

export const fetchCategories = () => dispatch => {
    dispatch(setLoading(true));

    return axios.get(GET_OR_ADD_OR_DELETE_CATEGORIES_URL)
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
            dispatch(setError(true, DEFAULT_ERROR_MESSAGE));
            dispatch(setLoading(false));
        });
};

export const fetchProducts = (perPage = 10, page = 1, filterCategoryId = null) => dispatch => {
    dispatch(setLoading(true));
    return axios.get(GET_PRODUCTS_URL, {params: {perPage, page, filterCategoryId}})
        .then(response => {
            const products = _.get(response, 'data.products', []);
            const productsCount = _.get(response, 'data.total', 0);
            if (!_.isArray(products)) {
                dispatch(setError(true));
                return;
            }
            dispatch(setProducts(products));
            dispatch(setProductsCount(productsCount));
            dispatch(setFilteredCategoryId(filterCategoryId));
            dispatch(setPerPage(perPage));
            dispatch(setPage(page));
        })
        .then(() => dispatch(setLoading(false)))
        .catch(error => {
            // handle error
            console.log(error);
            dispatch(setError(true));
        });
};

export const createCategory = (title) => dispatch => {
    dispatch(setLoading(true));

    return axios.post(GET_OR_ADD_OR_DELETE_CATEGORIES_URL, {title})
        .then(() => {
            dispatch(setIsRedirect(true));
        })
        .then(() => {
            dispatch(setIsRedirect(false));
            dispatch(setLoading(false))
        })
        .catch(error => {
            console.log(error);
            dispatch(setError(true, FIELD_ERROR));
        })
};

export const createProduct = (title, sellingPrice, purchasePrice, categoryId, image) => dispatch => {
    dispatch(setLoading(true));

    return axios.post(GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, {
        title, sellingPrice, purchasePrice, category: categoryId, image
    })
        .then(() => {
            dispatch(setIsRedirect(true));
        })
        .then(() => {
            dispatch(setIsRedirect(false));
            dispatch(setLoading(false))
        })
        .catch(error => {
            console.log(error);
            store.dispatch(setError(true, DEFAULT_ERROR_MESSAGE));
        });
};

export const updateProduct = (productIdToChange, title, sellingPrice, purchasePrice, categoryId, image) => dispatch => {
    dispatch(setLoading(true));

    return axios.put(GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, {
        id: productIdToChange,
        title,
        sellingPrice,
        purchasePrice,
        category: categoryId,
        image
    })
        .then(() => {
            dispatch(fetchProducts());
            dispatch(setIsRedirect(true));
        })
        .then(() => {
            dispatch(setIsRedirect(false));
            dispatch(setLoading(false));
        })
        .catch(() => {
            dispatch(setLoading(false));
            dispatch(setError(true, ''));
        })
};

export const deleteCategory = (id, title) => dispatch => {
    const conf = window.confirm(`Вы действительно хотите удалить категорию с названием - '${title}' ?`);

    if (conf) {
        dispatch(setLoading(true));
        return axios.delete(GET_OR_ADD_OR_DELETE_CATEGORIES_URL, {data: {id}})
            .then(() => {
                dispatch(setIsRedirect(true));
                dispatch(fetchProducts());
                dispatch(fetchCategories());
            })
            .then(() => {
                dispatch(setIsRedirect(false));
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err);
                dispatch(setLoading(false));
                dispatch(setError(true, ''));
            })
    }
};

export const deleteProduct = (id, title) => dispatch => {
    const conf = window.confirm(`Вы действительно хотите удалить продукт с названием - '${title}' ?`);

    if (conf) {
        dispatch(setLoading(true));
        return axios.delete(GET_OR_DELETE_PRODUCT_URL, {data: {id}})
            .then(() => {
                dispatch(setIsRedirect(true));
                dispatch(fetchProducts())
            })
            .then(() => {
                dispatch(setIsRedirect(false));
                dispatch(setLoading(false));
            })
            .catch(err => {
                console.log(err);
                dispatch(setLoading(false));
                dispatch(setError(true, ''));
            })
    }
};

export const fetchProductsByCategory = (id) => dispatch => {
    dispatch(setLoading(true));
    dispatch(fetchProducts(10, 1, id));
};

export const fetchProductById = id => dispatch => {
    dispatch(setLoading(true));

    axios.get(GET_OR_DELETE_PRODUCT_URL, {params: {id}})
        .then(response => {
            const product = _.get(response, 'data', null);

            if (!_.isObject(product)) {
                dispatch(setError(true, DEFAULT_ERROR_MESSAGE));
                return;
            }
            dispatch(setProduct(product));
        })
        .then(() => dispatch(setLoading(false)))
        .catch(() => {
            dispatch(setError(true, DEFAULT_ERROR_MESSAGE));
            dispatch(setLoading(false));
        })
};

export const handlePageChange = (page, pageSize, filteredCategoryId) => dispatch => {
    dispatch(fetchProducts(pageSize, page, filteredCategoryId));
};

export const handleAuthForm = (username, password, event) => dispatch => {
    event.preventDefault();
    dispatch(setLoading(true));
    axios.post('/login', {username, password})
        .then(() => {
            dispatch(setIsAuth(true));
            dispatch(setIsRedirect(true))
        })
        .then(() => {
            dispatch(setIsRedirect(false));
            dispatch(setLoading(false))
        })
        .catch(error => {
            dispatch(setError(true, 'Incorrect data!'));
            dispatch(setLoading(false));
            console.log(error);
        });
};

export const isAuth = () => dispatch => {
    const isAuth = store.getState().authReducer.isAuth;

    if (!isAuth) {
        dispatch(setError(true, 'You are not authorized!'));
        window.location.href = '/login';
    }
};
