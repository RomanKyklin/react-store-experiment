import {connect} from "react-redux";
import AddProduct from "../components/AddProduct";
import store from "../store/store";
import {setCategoryId, setError, setPurchasePrice, setSellingPrice, setTitle} from "../actions";
import axios from "axios";
import {GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, HOME_URL} from "../constants/app-contants";

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.productReducer.categories,
        isError: state.productReducer.isError,
        errorMessage: state.productReducer.errorMessage,
        isLoading: state.productReducer.isLoading,
        title: state.productReducer.title,
        sellingPrice: state.productReducer.sellingPrice,
        purchasePrice: state.productReducer.purchasePrice,
        categoryId: state.productReducer.categoryId
    }
};

const createProduct = (title, sellingPrice, purchasePrice, categoryId) => {
    axios.post(GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, {
        title, sellingPrice, purchasePrice, category: categoryId
    })
        .then(response => {
            window.location.href = HOME_URL;
        })
        .catch(error => {
            console.log(error);
            store.dispatch(setError(true, 'Произошла ошибка, попробуйте повторить позже'));
        });
};

const mapDispatchToProps = dispatch => {
    return {
        handleChangeTitle: (event) => {
            const title = event.target.value;
            dispatch(setTitle(title));
        },
        handleChangeSellingPrice: (event) => {
            const sellingPrice = event.target.value;
            dispatch(setSellingPrice(sellingPrice));
        },
        handleChangePurchasePrice: (event) => {
            const purchasePrice = event.target.value;
            dispatch(setPurchasePrice(purchasePrice));
        },
        handleChangeCategory: (id) => {
            dispatch(setCategoryId(id));
        },
        handleForm: (event, title, sellingPrice, purchasePrice, categoryId) => {
            event.preventDefault();
            if (title.trim().length === 0 || sellingPrice.trim().length === 0 || purchasePrice.trim().length === 0
                || categoryId.trim().length === 0) {
                dispatch(setError(true, 'Поля заполнены некорректно.'));
                return;
            }
            createProduct(title, sellingPrice, purchasePrice, categoryId);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)