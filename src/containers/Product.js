import {connect} from "react-redux";
import Product from "../components/Product";
import {deleteProduct} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.productReducer.products,
        isError: state.productReducer.isError,
        isLoading: state.productReducer.isLoading,
        filteredCategoryId: state.productReducer.filteredCategoryId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleDelete: (id, title) => dispatch(deleteProduct(id, title))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);