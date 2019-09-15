import _ from "lodash";
import {Redirect, Route, Switch} from "react-router";
import React from "react";

export const handleChangeField = setField => event =>
    setField(_.get(event, "target.value", ""));

export const handleChangeCategory = (id, setCategoryId) => {
    setCategoryId(id);
};

export const handleVisible = (isVisible, setVisible) => {
    setVisible(isVisible);
};

export const isFieldsNotEmpty = (...fields) => {
    return fields.every(el => el.trim().length !== 0);
};

export const redirect = (from, to, component) => (
    <Switch>
        <Redirect from={from} to={to}/>
        <Route path="/new-path" component={component}/>
    </Switch>
);
