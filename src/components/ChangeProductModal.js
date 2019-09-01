import React from "react";
import {Modal, Button, Input, Select, Form} from 'antd';
import PropTypes from 'prop-types';
import {Field, reduxForm} from "redux-form";
import AddProduct from "./AddProduct";

const {Option} = Select;

let ChangeProductModal = ({
                              id, categoryId, isLoading, isError, categories,
                              visible, showModal, handleCancel, handleOk, handleSubmit
                          }) => {
    if (!isLoading) {

        return (
            <>
                <Button type="primary" onClick={() => showModal(id)}>
                    Change
                </Button>
                <Modal
                    visible={visible}
                    title="Change product"
                    onCancel={handleCancel}
                >
                    <form onSubmit={handleSubmit(handleOk)}>
                        <Field name="title" component="input" type="text" placeholder="title" style={{width: '60%'}}/>
                        <Field name="sellingPrice" component="input" type="text" placeholder="selling price"
                               style={{width: '60%'}}/>
                        <Field name="purchasePrice" component="input" type="text" placeholder="purchase price"
                               style={{width: '60%'}}/>
                        <Field name="categoryId" component="select" style={{width: '60%'}}>
                            {categories.map(category => {
                                return (
                                    <option defaultValue={categoryId} key={category._id}
                                            value={category._id}>{category.title}</option>
                                )
                            })}
                        </Field>
                        <button type='submit'>Ok</button>
                    </form>
                </Modal>
            </>
        );
    }

};

ChangeProductModal.propTypes = {
    id: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    productIdToChange: PropTypes.string,
    showModal: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
};

ChangeProductModal = reduxForm({
    form: 'changeProduct',
})(ChangeProductModal);

export default ChangeProductModal;