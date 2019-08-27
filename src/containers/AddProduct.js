import {connect} from "react-redux";
import AddProduct from "../components/AddProduct";

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        isError: state.isError,
        errorMessage: state.errorMessage,
        isLoading: state.isLoading,
        title: state.title,
        sellingPrice: state.sellingPrice,
        purchasePrice: state.purchasePrice,
        categoryId: state.categoryId
    }
};

export default connect(mapStateToProps)(AddProduct)