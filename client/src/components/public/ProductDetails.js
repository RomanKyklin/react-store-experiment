import React, {useEffect} from 'react';
import {Alert, Col, Layout, Row, Spin} from "antd";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import get from 'lodash/get';
import {setError} from "../../actions";

const {Content} = Layout;

const ProductDetails = ({match, isLoading, isError, errorMessage, fetchProductById, product}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const id = get(match, 'params.id', null);

        if (!id) {
            dispatch(setError(true, 'Произошла ошибка'));
        }

        dispatch(fetchProductById(id));
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
                <Row type="flex" justify="center" style={{padding: "15px"}} gutter={16}>
                    <Col span={8}>
                        <img src={product.image} alt="product"
                             style={{boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)", width: "100%"}}/>
                    </Col>
                    <Col span={10}>
                        <div>
                            <h1>{product.title}</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti dignissimos dolores
                                eos
                                fugiat
                                incidunt nesciunt optio quos repudiandae unde vitae.</p>
                        </div>
                        <h1 style={{color: "#dd3f46", fontWeight: "700"}}>{product.selling_price} руб</h1>
                        <button type="button"
                                style={{
                                    height: "40px",
                                    background: "black",
                                    color: "white",
                                    padding: "10px",
                                    width: "130px"
                                }}>
                            В КОРЗИНУ
                        </button>
                    </Col>
                </Row>
            </>
        </Content>
    );
};

ProductDetails.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    fetchProductById: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
};

export default ProductDetails;
