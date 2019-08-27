import {connect} from "react-redux";
import AddProduct from "../components/AddProduct";

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

export default connect(mapStateToProps)(AddProduct)