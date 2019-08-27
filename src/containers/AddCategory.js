import React from "react";
import AddCategory from '../components/AddCategory';
import {connect} from "react-redux";


const mapStateToProps = (state, ownProps) => {
    return {
        title: state.categoryReducer.title,
        isError: state.categoryReducer.isError,
        errorMessage: state.categoryReducer.errorMessage,
    }
};

export default connect(mapStateToProps)(AddCategory);