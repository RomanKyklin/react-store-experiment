import {connect} from "react-redux";
import AddProduct from "../../components/admin/AddProduct";
import {
    createProduct,
    setError,
} from "../../actions";
import {isFieldsNotEmpty} from "./Forms";

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.productReducer.categories,
        isError: state.productReducer.isError,
        errorMessage: state.productReducer.errorMessage,
        isLoading: state.productReducer.isLoading,
        isRedirect: state.productReducer.isRedirect
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleForm: (event, title, sellingPrice, purchasePrice, categoryId, image) => {
            event.preventDefault();
            if (isFieldsNotEmpty(title, title, sellingPrice, purchasePrice, categoryId, image)) {
                dispatch(setError(true, 'Поля заполнены некорректно.'));
                return;
            }
            dispatch(createProduct(title, sellingPrice, purchasePrice, categoryId, image));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)