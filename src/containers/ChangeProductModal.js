import {connect} from "react-redux";
import ChangeProductModal from "../components/ChangeProductModal";

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        categories: state.categories,
        title: state.title,
        sellingPrice: state.sellingPrice,
        purchasePrice: state.purchasePrice,
        categoryId: state.categoryId,
        isLoading: state.isLoading,
        isError: state.isError,
        errorMessage: state.errorMessage,
        visible: state.visible,
        productIdToChange: state.productIdToChange
    }
};

export default connect(mapStateToProps)(ChangeProductModal);