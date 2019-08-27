import {connect} from "react-redux";
import Category from "../components/Category";

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categoryReducer.categories,
        isError: state.categoryReducer.isError,
        isLoading: state.categoryReducer.isLoading,
    }
};

export default connect(mapStateToProps)(Category);