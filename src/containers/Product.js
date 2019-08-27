import {connect} from "react-redux";
import Product from "../components/Product";

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.productReducer.products,
        isError: state.productReducer.isError,
        isLoading: state.productReducer.isLoading,
        filteredCategoryId: state.productReducer.filteredCategoryId
    }
};

export default connect(mapStateToProps)(Product);