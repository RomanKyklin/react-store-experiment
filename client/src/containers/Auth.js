import React from "react";
import Auth from '../components/Auth';
import {connect} from "react-redux";
import axios from "axios";
import {setError, setLoading} from "../actions";
import {HOME_URL} from "../constants/app-contants";

const mapStateToProps = (state, ownProps) => {
    return {
        isError: state.authReducer.isError,
        errorMessage: state.authReducer.errorMessage,
        isLoading: state.authReducer.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleForm: (username, password) => event => {
            event.preventDefault();
            dispatch(setLoading(true));
            axios.post('/login', {username, password})
                .then(response => {
                    localStorage.setItem('isAuth', 'true');
                    window.location.href = HOME_URL;
                })
                .then(() => dispatch(setLoading(false)))
                .catch(error => {
                    dispatch(setError(true, 'Incorrect data!'));
                    dispatch(setLoading(false));
                    console.log(error);
                });
            console.log(username, password);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);