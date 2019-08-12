import React, {useEffect} from "react";
import {Form, Input, Button, Col, Row, Select, Alert} from 'antd';
import PropTypes from 'prop-types';
import axios from "axios";
import store from '../store/store';
import {fetchCategories, setCategoryId, setError, setPurchasePrice, setSellingPrice, setTitle} from "../actions";
import {connect} from "react-redux";
import {GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, HOME_URL} from '../constants/app-contants'

const {Option} = Select;

const AddProduct = ({
                        categories,
                        isError,
                        errorMessage,
                        isLoading,
                        title,
                        sellingPrice,
                        purchasePrice,
                        categoryId
                    }) => {

    useEffect(() => {
        store.dispatch(fetchCategories());
    }, []);

    const handleForm = (event) => {
        event.preventDefault();
        if (title.trim().length === 0 || sellingPrice.trim().length === 0 || purchasePrice.trim().length === 0
            || categoryId.trim().length === 0) {
            store.dispatch(setError(true, 'Поля заполнены некорректно.'));
            return;
        }
        createProduct();
    };

    const handleChangeTitle = (event) => {
        const title = event.target.value;
        store.dispatch(setTitle(title));
    };

    const handleChangeSellingPrice = (event) => {
        const sellingPrice = event.target.value;
        store.dispatch(setSellingPrice(sellingPrice));
    };

    const handleChangePurchasePrice = (event) => {
        const purchasePrice = event.target.value;
        store.dispatch(setPurchasePrice(purchasePrice));
    };

    const handleChangeCategory = (id) => {
        store.dispatch(setCategoryId(id));
    };

    const createProduct = () => {
        axios.post(GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, {
            title, sellingPrice, purchasePrice, category: categoryId
        })
            .then(response => {
                window.location.href = HOME_URL;
            })
            .catch(error => {
                console.log(error);
                store.dispatch(setError(true, 'Произошла ошибка, попробуйте повторить позже'));
            });
    };

    if (isError) {
        return (
            <Row type="flex" justify="center">
                <Col span={13} style={{textAlign: 'center'}}>
                    <Alert message={errorMessage} type="error"/>
                </Col>
            </Row>
        )
    }

    return (
        <Row type="flex" justify="center">
            <Col style={{textAlign: "center"}} span={13}>
                <Form className="create-product-form" onSubmit={handleForm}>
                    <Form.Item>
                        <Input
                            placeholder="title"
                            onChange={handleChangeTitle}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            type="number"
                            placeholder="selling_price"
                            onChange={handleChangeSellingPrice}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            type="number"
                            placeholder="purchase_price"
                            onChange={handleChangePurchasePrice}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select style={{width: 120}} onChange={handleChangeCategory}>
                            {categories.map(category => {
                                return (
                                    <Option key={category._id} value={category._id}>{category.title}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Add product
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )

};


AddProduct.propTypes = {
    categories: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string,
    sellingPrice: PropTypes.string,
    purchasePrice: PropTypes.string,
    categoryId: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        isError: state.isError,
        errorMessage: state.errorMessage,
        isLoading: state.isLoading,
        title: state.title,
        sellingPrice: state.sellingPrice,
        purchasePrice: state.purchasePrice,
        categoryId: state.categoryId
    }
};

export default connect(mapStateToProps)(AddProduct)
