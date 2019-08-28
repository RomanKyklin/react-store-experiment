import {connect} from "react-redux";
import ChangeProductModal from "../components/ChangeProductModal";
import {
    handleChangeCategory,
    handleChangePurchasePrice, handleChangeSellingPrice,
    handleChangeTitle,
    setProductIdToChange,
    setVisible, updateProduct
} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        categories: state.productReducer.categories,
        title: state.productReducer.title,
        sellingPrice: state.productReducer.sellingPrice,
        purchasePrice: state.productReducer.purchasePrice,
        categoryId: state.productReducer.categoryId,
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
        handleChangeTitle: (event) => dispatch(handleChangeTitle(event)),
        handleChangePurchasePrice: (event) => dispatch(handleChangePurchasePrice(event)),
        handleChangeSellingPrice: (event) => dispatch(handleChangeSellingPrice(event)),
        handleChangeCategory: (id) => dispatch(handleChangeCategory(id)),
        handleOk: (productIdToChange, title, sellingPrice, purchasePrice, categoryId) => {
            dispatch(updateProduct(productIdToChange, title, sellingPrice, purchasePrice, categoryId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProductModal);