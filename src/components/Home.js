import * as React from "react";
import Category from "./Category";
import {Button, Col, Layout, Row} from "antd";
import Product from "./Product";
import {Link} from "react-router-dom";

const {Content} = Layout;

export default () => {
    return (
        <Layout>
            <Category/>
            <Layout style={{padding: '0 24px 24px'}}>
                <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Row style={{marginBottom: '1%'}}>
                        <Col span={3}>

                            <Button type="primary"><Link to="/add-product">Add products</Link></Button>
                        </Col>
                        <Col span={3}>
                            <Button type="primary"><Link to="/add-category">Add categories</Link></Button>
                        </Col>
                    </Row>
                    <Product/>
                </Content>
            </Layout>
        </Layout>
    )
}
