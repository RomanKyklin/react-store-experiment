import React from "react";
import AddCategory from '../components/AddCategory';
import {connect} from "react-redux";
import {createCategory, setError} from "../actions";
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
    return {
        isError: state.categoryReducer.isError,
        errorMessage: state.categoryReducer.errorMessage,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleForm: (values) => {
            const title = _.get(values, 'title', '');

            if(title) {
                dispatch(createCategory(title));
                return;
            }
            dispatch(setError(true, 'Поля заполнены некорректно'));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);