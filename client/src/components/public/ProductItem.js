import React from 'react';
import {Button, Card, Col} from "antd";
import {Link} from "react-router-dom";
const {Meta} = Card;

const ProductItem = ({product}) => {
    return (
        <Col span={8} style={{marginBottom: "20px"}}>
            <Card
                hoverable
                style={{width: 240, margin: "0 auto"}}
                cover={
                    <a href={product.image}>
                        <img alt="example"
                             src={product.image}
                             style={{height: '250px', width: '100%'}}/>
                    </a>
                }
            >
                <Meta title={product.title} style={{textAlign: "center"}}/>
                <Button type="primary" style={{display: "block", margin: "10px auto"}}>
                    <Link to={`/product/${product._id}`}>Details</Link>
                </Button>
            </Card>
        </Col>
    );
};

export default ProductItem;
