import {
    SET_CATEGORY, SET_CATEGORY_ID,
    SET_ERROR, SET_FILTERED_CATEGORY_ID, SET_LOADING, SET_PAGE, SET_PER_PAGE, SET_PRODUCT, SET_PRODUCT_ID_TO_CHANGE,
    SET_PRODUCTS, SET_PRODUCTS_COUNT,
    SET_PURCHASE_PRICE,
    SET_SELLING_PRICE,
    SET_TITLE, SET_VISIBLE
} from "../constants/action-types";
import axios from "axios";
import _ from "lodash";
import {
    ADD_CATEGORIES_URL, DELETE_CATEGORY,
    GET_CATEGORIES_URL, GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL,
    GET_OR_DELETE_PRODUCT_URL, GET_PRODUCTS_URL, HOME_URL
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

export const setTitle = makeActionCreator(SET_TITLE, 'title');

export const setSellingPrice = makeActionCreator(SET_SELLING_PRICE, 'sellingPrice');

export const setPurchasePrice = makeActionCreator(SET_PURCHASE_PRICE, 'purchasePrice');

export const setCategoryId = makeActionCreator(SET_CATEGORY_ID, 'categoryId');

export const setLoading = makeActionCreator(SET_LOADING, 'isLoading');

export const setFilteredCategoryId = makeActionCreator(SET_FILTERED_CATEGORY_ID, 'filteredCategoryId');

export const setVisible = makeActionCreator(SET_VISIBLE, 'visible');

export const setProduct = makeActionCreator(SET_PRODUCT, 'product');

export const setPage = makeActionCreator(SET_PAGE, 'page');

export const setProductsCount = makeActionCreator(SET_PRODUCTS_COUNT, 'productsCount');

export const setPerPage = makeActionCreator(SET_PER_PAGE, 'perPage');

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

    return axios.post(ADD_CATEGORIES_URL, {title})
        .then(response => {
            window.location.href = HOME_URL;
        })
        .then(() => dispatch(setLoading(false)))
        .catch(error => {
            console.log(error);
            dispatch(setError(true, 'Произошла ошибка. Поля заполнены неккоректно, либо попробуйте перезагрузить страницу или интернет.'));
        })
};

export const createProduct = (title, sellingPrice, purchasePrice, categoryId) => dispatch => {
    dispatch(setLoading(true));

    return axios.post(GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, {
        title, sellingPrice, purchasePrice, category: categoryId
    })
        .then(response => {
            window.location.href = HOME_URL;
        })
        .then(() => dispatch(setLoading(false)))
        .catch(error => {
            console.log(error);
            store.dispatch(setError(true, 'Произошла ошибка, попробуйте повторить позже'));
        });
};

export const updateProduct = (productIdToChange, title, sellingPrice, purchasePrice, categoryId) => dispatch => {
    dispatch(setLoading(true));

    return axios.put(GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, {
        id: productIdToChange,
        title,
        sellingPrice,
        purchasePrice,
        category: categoryId
    })
        .then(() => {
            dispatch(setVisible(false));
            dispatch(setLoading(false));
            window.location.href = HOME_URL;
        })
        .catch(err => {
            dispatch(setLoading(false));
            dispatch(setVisible(false));
            dispatch(setError(true, ''));
        })
};

export const handleChangeTitle = (event) => dispatch => {
    let title = _.get(event, 'target.value', '');
    dispatch(setTitle(title));
};

export const handleChangePurchasePrice = (event) => dispatch => {
    const purchasePrice = _.get(event, 'target.value', '');
    dispatch(setPurchasePrice(purchasePrice));
};

export const handleChangeSellingPrice = (event) => dispatch => {
    const sellingPrice = _.get(event, 'target.value', '');
    dispatch(setSellingPrice(sellingPrice));
};

export const handleChangeCategory = (id) => dispatch => dispatch(setCategoryId(id));

export const deleteCategory = (id, title) => dispatch => {
    const conf = window.confirm(`Вы действительно хотите удалить категорию с названием - '${title}' ?`);

    if (conf) {
        dispatch(setLoading(true));
        return axios.delete(DELETE_CATEGORY, {data: {id}})
            .then(res => {
                window.location.href = HOME_URL;
            })
            .then(() => dispatch(setLoading(false)))
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
            .then(response => {
                window.location.href = HOME_URL;
            })
            .then(() => setLoading(false))
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

export const handlePageChange = (page, pageSize) => dispatch => {
    dispatch(fetchProducts(pageSize, page));
};
