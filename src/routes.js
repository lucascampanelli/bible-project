import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./views/Home";

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}