import {connect} from "react-redux";
import Product from "../components/admin/Product";
import {deleteProduct, handlePageChange} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.productReducer.products,
        isError: state.productReducer.isError,
        isLoading: state.productReducer.isLoading,
        productsCount: state.productReducer.productsCount,
        perPage: state.productReducer.perPage,
        filteredCategoryId: state.productReducer.filteredCategoryId,
        page: state.productReducer.page,
        isRedirect: state.productReducer.isRedirect
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleDelete: (id, title) => dispatch(deleteProduct(id, title)),
        handlePageChange
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);