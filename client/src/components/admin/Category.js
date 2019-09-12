import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Menu, Icon} from "antd";
import Sider from "antd/es/layout/Sider";
import {fetchCategories} from "../../actions";
import {useDispatch} from "react-redux";

const Category = ({categories, isError, isLoading, handleClick, handleDeleteCategory}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

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
    handleClick: PropTypes.func.isRequired,
    handleDeleteCategory: PropTypes.func.isRequired
};

export default Category;


