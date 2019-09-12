import React from "react";
import AddCategory from '../components/admin/AddCategory';
import {connect} from "react-redux";
import {createCategory} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        title: state.categoryReducer.title,
        isError: state.categoryReducer.isError,
        errorMessage: state.categoryReducer.errorMessage,
        isRedirect: state.categoryReducer.isRedirect
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleForm: (event, title) => {
            event.preventDefault();
            dispatch(createCategory(title));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);