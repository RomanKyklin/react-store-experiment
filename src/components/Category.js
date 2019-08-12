import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Menu, Icon} from "antd";
import Sider from "antd/es/layout/Sider";
import {fetchCategories, setError, setFilteredCategoryId, setLoading} from "../actions";
import {connect, useDispatch} from "react-redux";
import axios from 'axios';
import {DELETE_CATEGORY, HOME_URL} from "../constants/app-contants";
import store from "../store/store";

const Category = ({categories, isError, isLoading}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const handleClick = (id) => {
        dispatch(setFilteredCategoryId(id));
    };

    const handleDeleteCategory = (id, title) => {
        const conf = window.confirm(`Вы действительно хотите удалить категорию с названием - '${title}' ?`);

        if (conf) {
            dispatch(setLoading(true));
            axios.delete(DELETE_CATEGORY, {data: {id}})
                .then(res => {
                    dispatch(setLoading(false));
                    window.location.href = HOME_URL;
                })
                .catch(err => {
                    console.log(err);
                    store.dispatch(setLoading(false));
                    store.dispatch(setError(true, ''));
                })
        }
    };

    return (
        <Sider width={200} style={{background: '#fff'}}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
            >
                <Menu.Item onClick={() => handleClick('')}>All categories</Menu.Item>

                {categories.map(category => {
                    return (
                        <Menu.Item key={category._id}
                                   onClick={() => handleClick(category._id)}>
                            {category.title} <Icon type="delete"
                                                   onClick={() => handleDeleteCategory(category._id, category.title)}/>
                        </Menu.Item>
                    )
                })}
            </Menu>
        </Sider>
    )
};

Category.propTypes = {
    categories: PropTypes.array.isRequired,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        isError: state.isError,
        isLoading: state.isLoading,
    }
};

export default connect(mapStateToProps)(Category);


