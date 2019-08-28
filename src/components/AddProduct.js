import React, {useEffect} from "react";
import {Form, Input, Button, Col, Row, Select, Alert} from 'antd';
import PropTypes from 'prop-types';
import {fetchCategories} from "../actions";
import {useDispatch} from "react-redux";

const {Option} = Select;

const AddProduct = ({
                        categories,
                        isError,
                        errorMessage,
                        isLoading,
                        title,
                        sellingPrice,
                        purchasePrice,
                        categoryId,
                        handleChangeTitle,
                        handleChangeSellingPrice,
                        handleChangePurchasePrice,
                        handleChangeCategory,
                        handleForm
                    }) => {

    const dispatch = useDispatch();

    useEffect(() => {
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
    categoryId: PropTypes.string,
    handleChangeTitle: PropTypes.func.isRequired,
    handleChangeSellingPrice: PropTypes.func.isRequired,
    handleChangePurchasePrice: PropTypes.func.isRequired,
    handleChangeCategory: PropTypes.func.isRequired,
    handleForm: PropTypes.func.isRequired

};

export default AddProduct;
