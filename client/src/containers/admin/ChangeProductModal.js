import {connect} from "react-redux";
import ChangeProductModal from "../../components/admin/ChangeProductModal";
import {
    updateProduct
} from "../../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        initialPurchasePrice: ownProps.initialPurchasePrice,
        initialTitle: ownProps.initialTitle,
        initialSellingPrice: ownProps.initialSellingPrice,
        initialCategoryId: ownProps.initialCategoryId,
        initialImage: ownProps.initialImage,
        categories: state.productReducer.categories,
        isLoading: state.productReducer.isLoading,
        isError: state.productReducer.isError,
        errorMessage: state.productReducer.errorMessage,
        isRedirect: state.productReducer.isRedirect
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleOk: (productIdToChange, title, sellingPrice, purchasePrice, categoryId, image) => {
            dispatch(updateProduct(productIdToChange, title, sellingPrice, purchasePrice, categoryId, image))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProductModal);