import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import store from '../store/store';
import {fetchCategories} from "../actions";
import {connect} from "react-redux";

var _ = require('lodash');

const Category = ({categories, isError, isLoading}) => {

    useEffect(() => {
        store.dispatch(fetchCategories());
    }, []);

    const handleClick = (id) => {
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


