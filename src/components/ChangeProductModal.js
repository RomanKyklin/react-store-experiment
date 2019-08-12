import React, {useEffect} from "react";
import {Modal, Button, Input, Select, Row, Col, Alert} from 'antd';
import {useDispatch} from "react-redux";
import {
    setCategoryId,
    setError,
    setLoading,
    setProduct, setProductIdToChange, setPurchasePrice, setSellingPrice,
    setTitle,
    setVisible
} from "../actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import axios from "axios";
import {GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, HOME_URL} from "../constants/app-contants";
import * as _ from "lodash";

const {Option} = Select;

const ChangeProductModal = ({
                                id, title, sellingPrice,
                                purchasePrice, categoryId, isLoading,
                                isError, categories, visible, productIdToChange
                            }) => {

    const dispatch = useDispatch();

    const showModal = () => {
        dispatch(setVisible(true));
        dispatch(setProductIdToChange(id));
    };

    const handleCancel = () => {
        dispatch(setVisible(false));
    };

    const handleOk = () => {
        dispatch(setLoading(true));
        axios.put(GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, {id: productIdToChange, title, sellingPrice, purchasePrice, category: categoryId})
            .then(() => {
                dispatch(setVisible(false));
                dispatch(setLoading(false));
                window.location.href = HOME_URL;
            })
            .catch(err => {
                dispatch(setLoading(false));
                dispatch(setVisible(false));
                dispatch(setError(true, ''));
            })
    };

    const handleChangeTitle = (ev) => {
        console.log(id);
        dispatch(setTitle(_.get(ev, 'target.value', '')));
    };

    const handleChangePurchasePrice = (ev) => {
        dispatch(setPurchasePrice(_.get(ev, 'target.value', '')));
    };

    const handleChangeSellingPrice = (ev) => {
        dispatch(setSellingPrice(_.get(ev, 'target.value', '')));
    };

    const handleChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    if (!isLoading) {
        return (
            <div>
                <Button type="primary" onClick={showModal}>
                    Change
                </Button>
                <Modal
                    visible={visible}
                    title="Change product"
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Input placeholder="Title" defaultValue={title} onChange={handleChangeTitle}/>
                    <Input placeholder="Selling price" onChange={handleChangeSellingPrice}/>
                    <Input placeholder="Purchase price"
                           onChange={handleChangePurchasePrice}/>
                    <Select style={{width: 120}} onChange={handleChangeCategory}>
                        {categories.map(category => {
                            return (
                                <Option key={category._id} value={category._id}>{category.title}</Option>
                            )
                        })}
                    </Select>
                </Modal>
            </div>
        );
    }

};

ChangeProductModal.propTypes = {
    id: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    title: PropTypes.string,
    sellingPrice: PropTypes.string,
    purchasePrice: PropTypes.string,
    categoryId: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    productIdToChange: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        categories: state.categories,
        title: state.title,
        sellingPrice: state.sellingPrice,
        purchasePrice: state.purchasePrice,
        categoryId: state.categoryId,
        isLoading: state.isLoading,
        isError: state.isError,
        errorMessage: state.errorMessage,
        visible: state.visible,
        productIdToChange: state.productIdToChange
    }
};

export default connect(mapStateToProps)(ChangeProductModal);