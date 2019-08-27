import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import AddProduct from "../containers/AddProduct";
import Home from "../components/Home";
import AddCategory from "../containers/AddCategory";


export default () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/add-product" component={AddProduct}/>
                <Route path="/add-category" component={AddCategory} />
            </div>
        </Router>
    );
}