import {connect} from "react-redux";
import Product from "../components/Product";

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        isError: state.isError,
        isLoading: state.isLoading,
        filteredCategoryId: state.filteredCategoryId
    }
};

export default connect(mapStateToProps)(Product);