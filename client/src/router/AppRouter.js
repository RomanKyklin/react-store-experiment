import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom"
import AddProduct from "../containers/admin/AddProduct";
import Home from "../components/admin/Home";
import Products from '../containers/public/Products';
import AddCategory from "../containers/admin/AddCategory";
import Auth from "../containers/admin/Auth";
import ProductDetails from "../containers/public/ProductDetails";


export default () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/add-product" component={AddProduct}/>
                <Route path="/add-category" component={AddCategory} />
                <Route path="/login" component={Auth} />
                <Route path="/products" component={Products} />
                <Route path="/product/:id" component={ProductDetails} />
            </div>
        </Router>
    );
}