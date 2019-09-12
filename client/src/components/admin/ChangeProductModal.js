import React, {useState} from "react";
import {Modal, Button, Input, Select} from 'antd';
import PropTypes from 'prop-types';
import {
    handleChangeCategory, handleChangeField, handleVisible, redirect
} from "../../containers/Forms";
import {HOME_URL} from "../../constants/app-contants";
import Home from "./Home";

const {Option} = Select;

const ChangeProductModal = ({
                                id, isLoading, isError, categories, handleOk, initialTitle, initialSellingPrice,
                                initialPurchasePrice, initialCategoryId, isRedirect
                            }) => {
    const [title, setTitle] = useState(initialTitle);
    const [sellingPrice, setSellingPrice] = useState(initialSellingPrice);
    const [purchasePrice, setPurchasePrice] = useState(initialPurchasePrice);
    const [categoryId, setCategoryId] = useState(initialCategoryId);
    const [visible, setVisible] = useState(false);

    if(isRedirect) {
        return redirect(HOME_URL, HOME_URL, Home);
    }

    if (!isLoading) {
        return (
            <>
                <Button type="primary" onClick={() => handleVisible(!visible, setVisible)}>
                    Change
                </Button>
                <Modal
                    visible={visible}
                    title="Change product"
                    onOk={() => handleOk(id, title, sellingPrice, purchasePrice, categoryId)}
                    onCancel={() => handleVisible(!visible, setVisible)}
                >
                    <Input placeholder="Title" defaultValue={title}
                           onChange={handleChangeField(setTitle)}/>
                    <Input placeholder="Selling price" defaultValue={sellingPrice}
                           onChange={handleChangeField(setSellingPrice)}/>
                    <Input placeholder="Purchase price" defaultValue={purchasePrice}
                           onChange={handleChangeField(setPurchasePrice)}/>
                    <Select style={{width: 120}} onChange={(id) => handleChangeCategory(id, setCategoryId)}
                            defaultValue={categoryId}>
                        {categories.map(category => {
                            return (
                                <Option key={category._id} value={category._id}>{category.title}</Option>
                            )
                        })}
                    </Select>
                </Modal>
            </>
        );
    }

};

ChangeProductModal.propTypes = {
    id: PropTypes.string.isRequired,
    initialTitle: PropTypes.string.isRequired,
    initialSellingPrice: PropTypes.number.isRequired,
    initialPurchasePrice: PropTypes.number.isRequired,
    initialCategoryId: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    handleOk: PropTypes.func.isRequired,
    isRedirect: PropTypes.bool.isRequired
};

export default ChangeProductModal;