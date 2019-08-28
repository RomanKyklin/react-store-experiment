import React from "react";
import AddCategory from '../components/AddCategory';
import {connect} from "react-redux";
import {createCategory, handleChangeTitle} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        title: state.categoryReducer.title,
        isError: state.categoryReducer.isError,
        errorMessage: state.categoryReducer.errorMessage,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleForm: (event) => {
            event.preventDefault();
            dispatch(createCategory());
        },
        handleChangeTitle: (event) => dispatch(handleChangeTitle(event))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);