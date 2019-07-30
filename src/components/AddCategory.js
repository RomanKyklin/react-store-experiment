import React, {useState, useEffect} from "react";
import {Alert, Button, Col, Form, Input, Row, Select} from "antd";
import axios from "axios";
import reducer from '../reducers/Reducer';
import {createStore} from 'redux'

const ADD_CATEGORIES_URL = 'http://localhost:3000/categories';
const HOME_URL = 'http://localhost:3001/';

export default () => {
    const [{
        isError,
        isLoading,
        errorMessage,
        title
    }, setState] = useState({isError: false, isLoading: true, errorMessage: '', title: ''});

    const handleForm = (event) => {
        event.preventDefault();
        createCategory();
    };

    const handleChangeTitle = (event) => {
        setState(currentState => ({...currentState, title: event.target.value}));
    };

    const createCategory = () => {
        axios.post(ADD_CATEGORIES_URL, {title})
            .then(response => {
                window.location.href = HOME_URL;
            })
            .catch(error => {
                console.log(error);
                setState(currentState => ({
                    ...currentState,
                    isError: true,
                    errorMessage: 'Произошла ошибка, попробуйте перезагрузить страницу или интернет'
                }));
            })
    };

    return (
        <Row type="flex" justify="center">
            {
                isError ? <Col span={13} style={{textAlign: 'center'}}>
                    <Alert message="Произошла ошибка" type="error"/>
                </Col> : ''
            }
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
}
