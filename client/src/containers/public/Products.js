import {connect} from "react-redux";
import Products from "../../components/public/Products";
import {handlePageChange} from "../../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.productReducer.products,
        isError: state.productReducer.isError,
        errorMessage: state.productReducer.errorMessage,
        isLoading: state.productReducer.isLoading,
        productsCount: state.productReducer.productsCount,
        perPage: state.productReducer.perPage,
        page: state.productReducer.page
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handlePageChange
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);