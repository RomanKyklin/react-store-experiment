import React from "react";
import {Alert, Button, Col, Form, Input, Row} from "antd";
import PropTypes from "prop-types";

const AddCategory = ({title, isError, errorMessage, handleForm, handleChangeTitle}) => {
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
    title: PropTypes.string,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    handleForm: PropTypes.func.isRequired,
    handleChangeTitle: PropTypes.func.isRequired
};

export default AddCategory;
