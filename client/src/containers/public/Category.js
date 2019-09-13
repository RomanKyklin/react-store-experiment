import {connect} from "react-redux";
import Category from "../../components/public/Category";
import {fetchProductsByCategory} from "../../actions";


const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categoryReducer.categories,
        isError: state.categoryReducer.isError,
        errorMessage: state.categoryReducer.errorMessage,
        isLoading: state.categoryReducer.isLoading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleClick: e => {
            dispatch(fetchProductsByCategory(e.key))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);