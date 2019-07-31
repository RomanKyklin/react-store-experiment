import React, {useEffect} from 'react';
import {Col, Divider, Row, Table, Tag, Spin} from "antd";
import store from '../store/store';
import {fetchProducts} from "../actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

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

const Product = ({products, isError, isLoading}) => {
    useEffect(() => {
        store.dispatch(fetchProducts()).then(() => console.log(store.getState()));
    }, []);


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
};

Product.propTypes = {
    products: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        isError: state.isError,
        isLoading: state.isLoading
    }
};

export default connect(mapStateToProps)(Product);

