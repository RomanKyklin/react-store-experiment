import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import axios from 'axios';
import store from '../store/store';
import {setCategory, setError} from "../actions";
import {connect} from "react-redux";

var _ = require('lodash');

const GET_CATEGORIES_URL = 'http://localhost:3000/categories';

const Category = ({categories, isError, isLoading}) => {
    useEffect(() => {
        axios.get(GET_CATEGORIES_URL)
            .then(response => {
                const categories = _.get(response, 'data', []);

                if (!_.isArray(categories)) {
                    store.dispatch(setError(true));
                    return;
                }
                store.dispatch(setCategory(categories));
                console.log(store.getState().categories);
            })
            .catch(error => {
                console.log(error);
                store.dispatch(setError(true));
            });
    });

    const handleClick = (id) => {
        console.log(store.getState());
        console.log(id);
    };

    return (
        <Sider width={200} style={{background: '#fff'}}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
            >
                {console.log(store.getState())}
                {categories.map(category => {
                    return (
                        <Menu.Item key={category._id}
                                   onClick={() => handleClick(category._id)}>{category.title}</Menu.Item>
                    )
                })}
            </Menu>
        </Sider>
    )
};

Category.propTypes = {
    categories: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        isError: state.isError,
        isLoading: state.isLoading
    }
};

export default connect(mapStateToProps)(Category)


