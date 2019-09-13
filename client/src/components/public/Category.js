import React, {useEffect} from 'react';
import {Alert, Col, Icon, Menu, Row, Spin} from "antd";
import PropTypes from "prop-types";

const {SubMenu} = Menu;

const Category = ({isError, errorMessage, isLoading, categories, handleClick}) => {
    if (isError) {
        return (
            <Row type="flex" justify="center">
                <Col span={13} style={{textAlign: 'center'}}>
                    <Alert message={errorMessage} type="error"/>
                </Col>
            </Row>
        )
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

    return (
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            onClick={handleClick}
        >
            <SubMenu
                key="sub1"
                title={
                    <span>
                                  <Icon type="setting"/>
                                  <span>Categories</span>
                                </span>
                }
            >
                {categories.map(category => <Menu.Item key={category._id}>{category.title}</Menu.Item>)}
            </SubMenu>
        </Menu>
    );
};

Category.propTypes = {
    categories: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    handleClick: PropTypes.func.isRequired
};

export default Category;
