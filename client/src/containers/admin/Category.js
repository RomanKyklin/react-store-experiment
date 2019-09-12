import Category from "../../components/admin/Category";
import {deleteCategory, fetchProductsByCategory, setFilteredCategoryId} from "../../actions";
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categoryReducer.categories,
        isError: state.categoryReducer.isError,
        isLoading: state.categoryReducer.isLoading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleClick: (id) => dispatch(fetchProductsByCategory(id)),
        handleDeleteCategory: (id, title) => dispatch(deleteCategory(id, title))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);