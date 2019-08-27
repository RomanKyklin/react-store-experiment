import {connect} from "react-redux";
import Category from "../components/Category";

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        isError: state.isError,
        isLoading: state.isLoading,
    }
};

export default connect(mapStateToProps)(Category);