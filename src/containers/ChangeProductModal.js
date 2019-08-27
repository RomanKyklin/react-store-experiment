import {connect} from "react-redux";
import ChangeProductModal from "../components/ChangeProductModal";
import _ from "lodash";
import {
    setCategoryId, setError,
    setLoading,
    setProductIdToChange,
    setPurchasePrice,
    setSellingPrice,
    setTitle,
    setVisible
} from "../actions";
import axios from "axios";
import {GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, HOME_URL} from "../constants/app-contants";

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        categories: state.productReducer.categories,
        title: state.productReducer.title,
        sellingPrice: state.productReducer.sellingPrice,
        purchasePrice: state.productReducer.purchasePrice,
        categoryId: state.productReducer.categoryId,
        isLoading: state.productReducer.isLoading,
        isError: state.productReducer.isError,
        errorMessage: state.productReducer.errorMessage,
        visible: state.productReducer.visible,
        productIdToChange: state.productReducer.productIdToChange
    }
};

const mapDispatchToProps = dispatch => {
    return {
        showModal: (id) => {
            dispatch(setVisible(true));
            dispatch(setProductIdToChange(id));
        },
        handleCancel: () => {
            dispatch(setVisible(false));
        },
        handleChangeTitle: (ev) => {
            dispatch(setTitle(_.get(ev, 'target.value', '')));
        },
        handleChangePurchasePrice: (ev) => {
            dispatch(setPurchasePrice(_.get(ev, 'target.value', '')));
        },
        handleChangeSellingPrice: (ev) => {
            dispatch(setSellingPrice(_.get(ev, 'target.value', '')));
        },
        handleChangeCategory: (id) => {
            dispatch(setCategoryId(id));
        },
        handleOk: (productIdToChange, title, sellingPrice, purchasePrice, categoryId) => {
            dispatch(setLoading(true));
            axios.put(GET_OR_CREATE_OR_UPDATE_PRODUCTS_URL, {
                id: productIdToChange,
                title,
                sellingPrice,
                purchasePrice,
                category: categoryId
            })
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProductModal);