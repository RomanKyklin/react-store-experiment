import React from "react";
import AddCategory from '../components/AddCategory';
import {connect} from "react-redux";
import {createCategory} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        title: state.categoryReducer.title,
        isError: state.categoryReducer.isError,
        errorMessage: state.categoryReducer.errorMessage,
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