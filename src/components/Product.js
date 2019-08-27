import React, {useEffect} from 'react';
import {Col, Divider, Row, Table, Spin, Layout} from "antd";
import store from '../store/store';
import {fetchProducts, setError, setLoading} from "../actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import ChangeProductModal from "../containers/ChangeProductModal";
import Button from "antd/es/button";
import axios from 'axios';
import {GET_OR_DELETE_PRODUCT_URL, HOME_URL} from "../constants/app-contants";

const Product = ({products, isError, isLoading, filteredCategoryId, handleDelete}) => {

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
            title: 'Category',
            dataIndex: 'category.title',
            key: 'category.title',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, i) => {
                return (
                    <span>
         <ChangeProductModal id={text._id}/>
         <Button type="danger" onClick={() => handleDelete(text._id, text.title)}> Delete </Button>
      </span>
                )
            },
        },
    ];

    useEffect(() => {
        store.dispatch(fetchProducts());
    }, [filteredCategoryId]);

    const filterProduct = () => {
        products = products.filter(val => val.category ? val.category._id === filteredCategoryId : false);
    };

    if (filteredCategoryId) {
        filterProduct();
    }

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
    isLoading: PropTypes.bool.isRequired,
    filteredCategoryId: PropTypes.string,
    handleDelete: PropTypes.func.isRequired
};

export default Product;

