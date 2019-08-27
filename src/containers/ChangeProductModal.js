import {connect} from "react-redux";
import ChangeProductModal from "../components/ChangeProductModal";

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

export default connect(mapStateToProps)(ChangeProductModal);