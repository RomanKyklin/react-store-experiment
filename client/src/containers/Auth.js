import React from "react";
import Auth from '../components/Auth';
import {connect} from "react-redux";
import {handleAuthForm} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        isError: state.authReducer.isError,
        errorMessage: state.authReducer.errorMessage,
        isLoading: state.authReducer.isLoading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleForm: (username, password) => event => dispatch(handleAuthForm(username, password, event))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);