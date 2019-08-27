import React from "react";
import AddCategory from '../components/AddCategory';
import {connect} from "react-redux";


const mapStateToProps = (state, ownProps) => {
    return {
        title: state.title,
        isError: state.isError,
        errorMessage: state.errorMessage,
    }
};

export default connect(mapStateToProps)(AddCategory);