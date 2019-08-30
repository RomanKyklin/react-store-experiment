import React, {useState} from "react";
import {Alert, Button, Col, Form, Input, Row} from "antd";
import PropTypes from "prop-types";
import {handleChangeTitle} from "../containers/Forms";

const AddCategory = ({isError, errorMessage, handleForm}) => {
    const [title, setTitle] = useState('');

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
                <Form className="create-product-form" onSubmit={(event) => handleForm(event, title)}>
                    <Form.Item>
                        <Input
                            placeholder="title"
                            onChange={(event) => handleChangeTitle(event, setTitle)}
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
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    handleForm: PropTypes.func.isRequired,
};

export default AddCategory;
