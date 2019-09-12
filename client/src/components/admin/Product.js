import React, {useEffect} from 'react';
import {Col, Row, Table, Spin, Pagination} from "antd";
import {fetchProducts} from "../../actions";
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import ChangeProductModal from "../../containers/admin/ChangeProductModal";
import Button from "antd/es/button";

const Product = ({products, isLoading, handleDelete, productsCount, perPage, page, handlePageChange, filteredCategoryId, isRedirect}) => {

    const dispatch = useDispatch();

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Purchase price',
            dataIndex: 'purchase_price',
            key: 'purchase_price',
        },
        {
            title: 'Selling price',
            dataIndex: 'selling_price',
            key: 'selling_price',
        },
        {
            title: 'Category',
            dataIndex: 'category.title',
            key: 'category.title',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, i) => {
                return (
                    <span>
         <ChangeProductModal id={text._id} initialPurchasePrice={text.purchase_price}
                             initialSellingPrice={text.selling_price}
                             initialTitle={text.title}
                             initialCategoryId={text.category._id}
                             initialImage={text.image}/>
         <Button type="danger" onClick={() => handleDelete(text._id, text.title)}> Delete </Button>
      </span>
                )
            },
        },
    ];

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

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
        <>
            <Row>
                <Col>
                    <Table columns={columns} dataSource={products} pagination={false}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Pagination defaultCurrent={page} total={productsCount} pageSize={perPage}
                                onChange={(page, pageSize) => dispatch(handlePageChange(page, pageSize, filteredCategoryId))}
                                style={{marginTop: '1%'}}/>
                </Col>
            </Row>
        </>
    )
};

Product.propTypes = {
    products: PropTypes.array.isRequired,
    filteredCategoryId: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    productsCount: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    perPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    isRedirect: PropTypes.bool.isRequired
};

export default Product;

