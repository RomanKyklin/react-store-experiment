import React, {useEffect} from "react";
import {Form, Input, Button, Col, Row, Select, Alert} from 'antd';
import PropTypes from 'prop-types';
import {fetchCategories} from "../actions";
import {useDispatch} from "react-redux";
import {Field, reduxForm} from "redux-form";
import AddCategory from "./AddCategory";

const {Option} = Select;

let AddProduct = ({
                      categories,
                      isError,
                      errorMessage,
                      isLoading,
                      handleForm,
                      handleSubmit
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
                      onSubmit={handleSubmit(handleForm)}
                      style={{padding: '1%'}}>
                    <Form.Item>
                        <Field name="title" component="input" type="text" placeholder="title" style={{width: '40%'}}/>
                    </Form.Item>
                    <Form.Item>
                        <Field name="sellingPrice" component="input" type="text" placeholder="selling price"
                               style={{width: '40%'}}/>
                    </Form.Item>
                    <Form.Item>
                        <Field name="purchasePrice" component="input" type="text" placeholder="purchase price"
                               style={{width: '40%'}}/>
                    </Form.Item>
                    <Form.Item>
                        <Field name="categoryId" component="select" style={{width: '40%'}}>
                            <option></option>
                            {categories.map(category => {
                                return (
                                    <option key={category._id} value={category._id}>{category.title}</option>
                                )
                            })}
                        </Field>
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
    handleForm: PropTypes.func.isRequired

};

AddProduct = reduxForm({
    form: 'addProduct',
})(AddProduct);

export default AddProduct;
