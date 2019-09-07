import React, {useEffect, useState} from "react";
import {Form, Input, Button, Col, Row, Select, Alert} from 'antd';
import PropTypes from 'prop-types';
import {fetchCategories, isAuth} from "../actions";
import {useDispatch} from "react-redux";
import {
    handleChangeCategory, handleChangeField,
} from "../containers/Forms";

const {Option} = Select;

const AddProduct = ({
                        categories,
                        isError,
                        errorMessage,
                        isLoading,
                        handleForm
                    }) => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        dispatch(isAuth());
        dispatch(fetchCategories());
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

    return (
        <Row type="flex" justify="center">
            <Col style={{textAlign: "center"}} span={13}>
                <Form className="create-product-form"
                      onSubmit={(event) => handleForm(event, title, sellingPrice, purchasePrice, categoryId)}>
                    <Form.Item>
                        <Input
                            placeholder="title"
                            onChange={handleChangeField(setTitle)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            type="number"
                            placeholder="selling_price"
                            onChange={handleChangeField(setSellingPrice)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            type="number"
                            placeholder="purchase_price"
                            onChange={handleChangeField(setPurchasePrice)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select style={{width: 120}} onChange={(id) => handleChangeCategory(id, setCategoryId)}>
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
    categoryId: PropTypes.string,
    handleForm: PropTypes.func.isRequired

};

export default AddProduct;
