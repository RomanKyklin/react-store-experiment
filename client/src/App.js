import React from 'react';
import './App.css';
import {Layout, Menu} from 'antd';
import AppRouter from "./router/AppRouter";
import {Provider} from "react-redux";
import store from './store/store';

const {Header, Footer} = Layout;

export default () => {
    return (
        <Provider store={store}>
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <AppRouter/>
            </Layout>
        </Provider>
    );
}

