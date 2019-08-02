import React, {useEffect} from "react";
import {Modal, Button, Input, Select} from 'antd';
import {useDispatch} from "react-redux";
import {fetchCategories, setCategory, setLoading, setVisible} from "../actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import axious from 'axios';

const {Option} = Select;

const ChangeProductModal = ({
                                id, title, sellingPrice,
                                purchasePrice, categoryId, isLoading,
                                isError, errorMessage, categories, visible
                            }) => {
    const dispatch = useDispatch();

    const showModal = () => {
        dispatch(setVisible(true));
    };

    const handleCancel = () => {
        dispatch(setVisible(false));
    };

    const handleOk = () => {

    };

    const handleChangeTitle = (ev) => {
        console.log(ev.target.value);
    };

    const handleChangePurchasePrice = (ev) => {
        console.log(ev);
    };

    const handleChangeSellingPrice = (ev) => {
        console.log(ev);
    };

    const handleChangeCategory = (id) => {
        console.log(id)
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Change
            </Button>
            <Modal
                visible={visible}
                title="Change product"
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                <Input placeholder="Title" onChange={handleChangeTitle}/>
                <Input placeholder="Selling price" onChange={handleChangeSellingPrice}/>
                <Input placeholder="Purchase price" onChange={handleChangePurchasePrice}/>
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
};

ChangeProductModal.propTypes = {
    id: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    sellingPrice: PropTypes.string.isRequired,
    purchasePrice: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.id,
        categories: state.categories,
        title: state.title,
        sellingPrice: state.sellingPrice,
        purchasePrice: state.purchasePrice,
        categoryId: state.categoryId,
        isLoading: state.isLoading,
        isError: state.isError,
        errorMessage: state.errorMessage,
        visible: state.visible
    }
};

export default connect(mapStateToProps)(ChangeProductModal);