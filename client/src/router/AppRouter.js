import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import AddProduct from "../containers/AddProduct";
import Home from "../components/Home";
import AddCategory from "../containers/AddCategory";
import Auth from "../components/Auth";


export default () => {
    return (
        <Router>
            <div>
                <Route path="/login" component={Auth} />
                <Route exact path="/" component={Home}/>
                <Route path="/add-product" component={AddProduct}/>
                <Route path="/add-category" component={AddCategory} />
            </div>
        </Router>
    );
}