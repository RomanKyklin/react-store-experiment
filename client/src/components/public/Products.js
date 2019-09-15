import React, {useEffect} from 'react';
import {Alert, Col, Layout, Pagination, Row, Spin} from 'antd';
import PropTypes from "prop-types";
import {fetchCategories, fetchProducts} from "../../actions";
import {useDispatch} from "react-redux";
import Category from "../../containers/public/Category";
import ProductItem from "./ProductItem";

const {Content} = Layout;

const Products = ({products, isLoading, isError, errorMessage, productsCount, perPage, page, handlePageChange, filteredCategoryId}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories())
    }, []);

    if (isError) {
        return (
            <Row type="flex" justify="center">
                <Col span={13} style={{textAlign: 'center'}}>
                    <Alert message={errorMessage} type="error"/>
                </Col>
            </Row>
        )
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
        <Content>
            <>
                <Row style={{padding: '15px'}} type="flex" justify="center">
                    <Col span={4}>
                        <Category/>
                    </Col>
                    <Col span={20}>
                        {products.map(product => (
                            <ProductItem product={product}/>
                        ))}
                    </Col>
                </Row>
                <Row type="flex" justify="center" style={{padding: "20px"}}>
                    <Col style={{marginTop: "20px", textAlign: "center"}}>
                        <Pagination defaultCurrent={page} total={productsCount} pageSize={perPage}
                                    onChange={(page, pageSize) => dispatch(handlePageChange(page, pageSize, filteredCategoryId))}/>
                    </Col>
                </Row>
            </>
        </Content>
    );
};

Products.propTypes = {
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    perPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    productsCount: PropTypes.number.isRequired,
    filteredCategoryId: PropTypes.string
};


export default Products;
