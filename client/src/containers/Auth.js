import React from "react";
import Auth from '../components/Auth';
import {connect} from "react-redux";
import axios from "axios";
import {handleAuthForm, setError, setLoading} from "../actions";
import {HOME_URL} from "../constants/app-contants";

const mapStateToProps = (state, ownProps) => {
    return {
        isError: state.authReducer.isError,
        errorMessage: state.authReducer.errorMessage,
        isLoading: state.authReducer.isLoading,
        isAuth: state.authReducer.isAuth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleForm: (username, password) => event => dispatch(handleAuthForm(username, password, event))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);