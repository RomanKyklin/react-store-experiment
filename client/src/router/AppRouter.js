import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom"
import AddProduct from "../containers/AddProduct";
import Home from "../components/Home";
import AddCategory from "../containers/AddCategory";
import Auth from "../containers/Auth";


export default () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/add-product" component={AddProduct}/>
                <Route path="/add-category" component={AddCategory} />
                <Route path="/login" component={Auth} />
            </div>
        </Router>
    );
}