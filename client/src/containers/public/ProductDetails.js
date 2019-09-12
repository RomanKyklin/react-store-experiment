import {fetchProductById} from "../../actions";
import {connect} from "react-redux";
import ProductDetails from "../../components/public/ProductDetails";

const mapStateToProps = (state, ownProps) => {
    return {
        isError: state.productReducer.isError,
        errorMessage: state.productReducer.errorMessage,
        isLoading: state.productReducer.isLoading,
        product: state.productReducer.product
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductById
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);