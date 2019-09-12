import React, {useState} from 'react';
import {Form, Icon, Input, Button, Row, Col, Alert, Spin} from 'antd';
import {handleChangeField, redirect} from "../../containers/Forms";
import PropTypes from "prop-types";
import {HOME_URL, LOGIN_URL} from "../../constants/app-contants";
import Home from "./Home";

const Auth = ({handleForm, isError, errorMessage, isLoading, isRedirect}) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    if(isRedirect) {
        return redirect(LOGIN_URL, HOME_URL, Home);
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
            <Col style={{textAlign: "center", padding: "3%"}} span={13}>
                <Form layout="inline" onSubmit={handleForm(username, password)}>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                            onChange={handleChangeField(setUsername)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                            onChange={handleChangeField(setPassword)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

Auth.propTypes = {
    handleForm: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    isRedirect: PropTypes.bool.isRequired
};

export default Auth;
