import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom"
import AddProduct from "../containers/AddProduct";
import Home from "../components/Home";
import AddCategory from "../containers/AddCategory";
import Auth from "../containers/Auth";


export default () => {
    const isAuth = localStorage.getItem('isAuth') === 'true';

    return (
        <Router>
            <div>
                <Route exact path="/" render={() => isAuth ? <Home/> : <Redirect to="/login"/>}/>
                <Route path="/add-product" render={() => isAuth ? <AddProduct/> : <Redirect to="/login"/>}/>
                <Route path="/add-category" render={() => isAuth ? <AddCategory/> : <Redirect to="/login"/>} />
                <Route path="/login" render={() => isAuth ? <Redirect to="/"/> : <Auth/> } />
            </div>
        </Router>
    );
}