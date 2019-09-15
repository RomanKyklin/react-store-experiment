import React, {useEffect, useState} from "react";
import {Alert, Button, Col, Form, Input, Row} from "antd";
import PropTypes from "prop-types";
import {handleChangeField} from "../../containers/admin/Forms";
import {useDispatch} from "react-redux";
import {isAuth} from "../../actions";
import Home from "./Home";
import {redirect} from "../../containers/admin/Forms";
import {
    ADD_CATEGORY_CLIENT_URL,
    HOME_URL
} from "../../constants/app-contants";

const AddCategory = ({isError, errorMessage, handleForm, isRedirect}) => {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isAuth());
    }, []);

    if (isRedirect) {
        return redirect(ADD_CATEGORY_CLIENT_URL, HOME_URL, Home);
    }

    if (isError) {
        return (
            <Row type="flex" justify="center">
                <Col span={13} style={{textAlign: "center"}}>
                    <Alert message={errorMessage} type="error"/>
                </Col>
            </Row>
        );
    }

    return (
        <Row type="flex" justify="center">
            <Col style={{textAlign: "center"}} span={13}>
                <Form
                    className="create-product-form"
                    onSubmit={event => handleForm(event, title)}
                >
                    <Form.Item>
                        <Input placeholder="title" onChange={handleChangeField(setTitle)}/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Add category
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

AddCategory.propTypes = {
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    handleForm: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired
};

export default AddCategory;
