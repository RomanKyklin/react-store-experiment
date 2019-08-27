import React from "react";
import {Alert, Button, Col, Form, Input, Row} from "antd";
import axios from "axios";
import {HOME_URL, ADD_CATEGORIES_URL} from "../constants/app-contants";
import {setError, setTitle} from "../actions";
import {useDispatch} from "react-redux";
import _ from 'lodash';
import PropTypes from "prop-types";

const AddCategory = ({title, isError, errorMessage}) => {
    const dispatch = useDispatch();

    const handleForm = (event) => {
        event.preventDefault();
        createCategory();
    };

    const handleChangeTitle = (event) => {
        let title = _.get(event, 'target.value', '');

        dispatch(setTitle(title));
    };

    const createCategory = () => {
        axios.post(ADD_CATEGORIES_URL, {title})
            .then(response => {
                window.location.href = HOME_URL;
            })
            .catch(error => {
                console.log(error);
                dispatch(setError(true, 'Произошла ошибка. Поля заполнены неккоректно, либо попробуйте перезагрузить страницу или интернет.'));
            })
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
};

export default AddCategory;
