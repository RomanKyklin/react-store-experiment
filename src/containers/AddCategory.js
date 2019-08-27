import React from "react";
import AddCategory from '../components/AddCategory';
import {connect} from "react-redux";
import axios from "axios";
import {ADD_CATEGORIES_URL, HOME_URL} from "../constants/app-contants";
import {setError, setTitle} from "../actions";
import store from '../store/store';
import _ from "lodash";


const createCategory = (dispatch) => {
    const title = store.getState().categoryReducer.title;

    axios.post(ADD_CATEGORIES_URL, {title})
        .then(response => {
            window.location.href = HOME_URL;
        })
        .catch(error => {
            console.log(error);
            dispatch(setError(true, 'Произошла ошибка. Поля заполнены неккоректно, либо попробуйте перезагрузить страницу или интернет.'));
        })
};

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
            createCategory(dispatch);
        },
        handleChangeTitle: (event) => {
            let title = _.get(event, 'target.value', '');

            dispatch(setTitle(title));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);