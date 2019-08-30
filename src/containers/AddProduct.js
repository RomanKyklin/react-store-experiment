import {connect} from "react-redux";
import AddProduct from "../components/AddProduct";
import {
    createProduct,
    setError,
} from "../actions";

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
        handleForm: (event, title, sellingPrice, purchasePrice, categoryId) => {
            event.preventDefault();
            if (title.trim().length === 0 || sellingPrice.trim().length === 0 || purchasePrice.trim().length === 0
                || categoryId.trim().length === 0) {
                dispatch(setError(true, 'Поля заполнены некорректно.'));
                return;
            }
            dispatch(createProduct(title, sellingPrice, purchasePrice, categoryId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)