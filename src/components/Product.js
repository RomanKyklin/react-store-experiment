import React, {useEffect} from 'react';
import {Col, Divider, Row, Table, Spin, Layout} from "antd";
import store from '../store/store';
import {fetchProducts} from "../actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import ChangeProductModal from "./ChangeProductModal";

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
        render: (text, record) => (
            <span>
         <ChangeProductModal/>
        <Divider type="vertical"/>
        <a href="javascript:;">Delete</a>
      </span>
        ),
    },
];

const Product = ({products, isError, isLoading, filteredCategoryId}) => {
    useEffect(() => {
        store.dispatch(fetchProducts());
    }, [filteredCategoryId]);

    const filterProduct = () => {
        products = products.filter(val => val.category._id === filteredCategoryId);
    };

    if(filteredCategoryId) {
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
    filteredCategoryId: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        isError: state.isError,
        isLoading: state.isLoading,
        filteredCategoryId: state.filteredCategoryId
    }
};

export default connect(mapStateToProps)(Product);

