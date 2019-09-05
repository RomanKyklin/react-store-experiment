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
                <Route exact path="/client" component={Home}/>
                <Route path="/client/login" component={Auth} />
                <Route path="/client/add-product" component={AddProduct}/>
                <Route path="/client/add-category" component={AddCategory} />
            </div>
        </Router>
    );
}