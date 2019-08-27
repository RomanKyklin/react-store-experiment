import {connect} from "react-redux";
import Product from "../components/Product";
import store from "../store/store";
import {setError, setLoading, setProducts} from "../actions";
import axios from "axios";
import {GET_OR_DELETE_PRODUCT_URL, HOME_URL} from "../constants/app-contants";

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.productReducer.products,
        isError: state.productReducer.isError,
        isLoading: state.productReducer.isLoading,
        filteredCategoryId: state.productReducer.filteredCategoryId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleDelete: (id, title) => {
            const conf = window.confirm(`Вы действительно хотите удалить продукт с названием - '${title}' ?`);

            if (conf) {
                dispatch(setLoading(true));
                axios.delete(GET_OR_DELETE_PRODUCT_URL, {data: {id}})
                    .then(response => {
                        store.dispatch(setLoading(false));
                        window.location.href = HOME_URL;
                    })
                    .catch(err => {
                        console.log(err);
                        store.dispatch(setLoading(false));
                        store.dispatch(setError(true, ''));
                    })
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);