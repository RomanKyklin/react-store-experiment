import {connect} from "react-redux";
import ChangeProductModal from "../components/ChangeProductModal";
import get from 'lodash/get';
import {
    createProduct,
    setError,
    setProductIdToChange,
    setVisible
} from "../actions";
import store from "../store/store";
import {addOrChangeProduct} from "./AddProduct";

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        categories: state.productReducer.categories,
        isLoading: state.productReducer.isLoading,
        isError: state.productReducer.isError,
        errorMessage: state.productReducer.errorMessage,
        visible: state.productReducer.visible,
        productIdToChange: state.productReducer.productIdToChange
    }
};

const mapDispatchToProps = dispatch => {
    return {
        showModal: (id) => {
            dispatch(setVisible(true));
            dispatch(setProductIdToChange(id));
        },
        handleCancel: () => {
            dispatch(setVisible(false));
        },
        handleOk: (values) => addOrChangeProduct(values, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProductModal);