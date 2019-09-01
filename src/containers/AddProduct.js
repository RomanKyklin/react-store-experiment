import {connect} from "react-redux";
import AddProduct from "../components/AddProduct";
import get from 'lodash/get';
import {
    createProduct, setError, updateProduct,
} from "../actions";
import store from "../store/store";

export const addOrChangeProduct = (values, dispatch) => {
    const {productIdToChange = null} = store.getState().productReducer;
    const title = get(values, 'title', null);
    const sellingPrice = get(values, 'sellingPrice', null);
    const purchasePrice = get(values, 'purchasePrice', null);
    const categoryId = get(values, 'categoryId', null);

    if (title && sellingPrice && purchasePrice && categoryId && !productIdToChange) {
        dispatch(createProduct(title, sellingPrice, purchasePrice, categoryId));
        return;
    }
    if (title && sellingPrice && purchasePrice && categoryId && productIdToChange) {
        dispatch(updateProduct(productIdToChange, title, sellingPrice, purchasePrice, categoryId));
        return;
    }
    dispatch(setError(true, 'Поля заполнены некорректно'));
};

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

const mapDispatchToProps = dispatch => {
    return {
        handleForm: (values) => addOrChangeProduct(values, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)