import React from 'react'
import App from '../App';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RecipeForm from "./Recipe_Form";
import SignInView from './SignInView';
import SignUpView from './SignUpView';


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component = {App}/>
            <Route exact path='/signup' component = {SignUpView}/>
            <Route exact path='/signin' component={SignInView}/>
        </Switch>
    </BrowserRouter>
)

export default Router;