import React, {useEffect} from 'react';
import {Alert, Button, Card, Col, Layout, Pagination, Row, Spin} from 'antd';
import PropTypes from "prop-types";
import {fetchProducts} from "../../actions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const {Meta} = Card;
const {Content} = Layout;

const Products = ({products, isLoading, isError, errorMessage, productsCount, perPage, page, handlePageChange}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
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
                    {products.map(product => (
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{width: 240, margin: "0 auto"}}
                                cover={
                                    <a href={product.image}>
                                        <img alt="example"
                                             src={product.image}
                                             style={{height: '250px', width: '100%'}}/>
                                    </a>
                                }
                            >
                                <Meta title={product.title} style={{textAlign: "center"}}/>
                                <Button type="primary" style={{display: "block", margin: "10px auto"}}>
                                    <Link to={"/product/" + product._id}>Details</Link>
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row type="flex" justify="center">
                    <Col style={{marginTop: "20px", textAlign: "center"}}>
                        <Pagination defaultCurrent={page} total={productsCount} pageSize={perPage}
                                    onChange={(page, pageSize) => dispatch(handlePageChange(page, pageSize, null))}
                                    style={{marginTop: '1%'}}/>
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
};


export default Products;
