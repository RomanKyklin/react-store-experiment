import React from "react";
import {Alert, Button, Col, Form, Input, Row} from "antd";
import PropTypes from "prop-types";
import {Field, formValueSelector, reduxForm} from 'redux-form'
import {connect} from "react-redux";

let AddCategory = ({isError, errorMessage, handleForm, handleSubmit}) => {

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
                <Form className="create-product-form" onSubmit={handleSubmit(handleForm)} style={{padding: '1%'}}>
                    <Form.Item>
                        <Field name="title" component="input" type="text" placeholder="title" style={{width: '40%'}}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Add category
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
};

AddCategory.propTypes = {
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    handleForm: PropTypes.func.isRequired,
};

AddCategory = reduxForm({
    form: 'addCategory',
})(AddCategory);

export default AddCategory;
