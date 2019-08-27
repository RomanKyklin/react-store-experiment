import Category from "../components/Category";
import {setError, setFilteredCategoryId, setLoading} from "../actions";
import {connect} from "react-redux";
import store from "../store/store";
import axios from "axios";
import {DELETE_CATEGORY, HOME_URL} from "../constants/app-contants";

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categoryReducer.categories,
        isError: state.categoryReducer.isError,
        isLoading: state.categoryReducer.isLoading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleClick: (id) => dispatch(setFilteredCategoryId(id)),
        handleDeleteCategory: (id, title) => {
            const conf = window.confirm(`Вы действительно хотите удалить категорию с названием - '${title}' ?`);

            if (conf) {
                dispatch(setLoading(true));
                axios.delete(DELETE_CATEGORY, {data: {id}})
                    .then(res => {
                        dispatch(setLoading(false));
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);