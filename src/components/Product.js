import React, {useState, useEffect} from 'react';
import {Col, Divider, Row, Table, Tag, Spin} from "antd";

import axios from 'axios';

var _ = require('lodash');

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Purchase price',
        dataIndex: 'purchase_price',
        key: 'purchase_price',
    },
    {
        title: 'Selling price',
        dataIndex: 'selling_price',
        key: 'selling_price',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
        <a href="javascript:;">Change</a>
        <Divider type="vertical"/>
        <a href="javascript:;">Delete</a>
      </span>
        ),
    },
];

const GET_PRODUCTS_URL = 'http://localhost:3000/products';

export default () => {
    const [{
        products,
        isError,
        isLoading
    }, setState] = useState({
        products: [],
        isError: false,
        isLoading: true
    });

    useEffect(() => {
        axios.get(GET_PRODUCTS_URL)
            .then(response => {
                const products = _.get(response, 'data', []);

                if (!_.isArray(products)) {
                    setState(currentState => ({...currentState, isError: true, isLoading: false}));
                    return;
                }
                setState(currentState => ({...currentState, products, isLoading: false}));
            })
            .catch(error => {
                // handle error
                console.log(error);
                setState(currentState => ({...currentState, isError: true, isLoading: false}));
            });
    });


    if (isLoading) {
        return (
            <Row type="flex" justify="center">
                <Col span={12}>
                    <Spin style={{display: "block"}}/>
                </Col>
            </Row>
        )
    }

    return (
        <Row>
            <Col>
                <Table columns={columns} dataSource={products}/>
            </Col>
        </Row>
    )
}