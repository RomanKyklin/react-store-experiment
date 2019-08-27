import React from "react";
import {Modal, Button, Input, Select} from 'antd';
import PropTypes from 'prop-types';

const {Option} = Select;

const ChangeProductModal = ({
                                id, title, sellingPrice, purchasePrice, categoryId, isLoading, isError, categories,
                                visible, productIdToChange, showModal, handleCancel, handleChangeTitle, handleOk,
                                handleChangePurchasePrice, handleChangeSellingPrice, handleChangeCategory
                            }) => {
    if (!isLoading) {
        return (
            <div>
                <Button type="primary" onClick={() => showModal(id)}>
                    Change
                </Button>
                <Modal
                    visible={visible}
                    title="Change product"
                    onOk={() => handleOk(productIdToChange, title, sellingPrice, purchasePrice, categoryId)}
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
    productIdToChange: PropTypes.string,
    showModal: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleChangeTitle: PropTypes.func.isRequired,
    handleChangePurchasePrice: PropTypes.func.isRequired,
    handleChangeSellingPrice: PropTypes.func.isRequired,
    handleChangeCategory: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
};

export default ChangeProductModal;