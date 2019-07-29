import React, {useState, useEffect} from 'react';
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import axios from 'axios';

var _ = require('lodash');

const GET_CATEGORIES_URL = 'http://localhost:3000/categories';

export default ({catId, id}) => {

    const [{categories, isError, isLoading}, setState] = useState({
        categories: [],
        isError: false,
        isLoading: true
    });

    useEffect(() => {
        axios.get(GET_CATEGORIES_URL)
                .then(response => {
                    const categories = _.get(response, 'data', []);

                    if (!_.isArray(categories)) {
                        setState(currentState => ({...currentState, isError: true, isLoading: false}));
                        return;
                    }
                    setState(currentState => ({...currentState, categories, isLoading: false}));
                })
                .catch(error => {
                    console.log(error);
                    setState(currentState => ({...currentState, isError: true, isLoading: false}));
                });
        }, [catId, id]);

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

