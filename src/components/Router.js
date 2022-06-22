import React from 'react'
import App from '../App';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RecipeForm from "./Recipe_Form";
import SignInView from './SignInView';
import SignUpView from './SignUpView';
import { Redirect } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import RecipeFeed from "./RecipeFeed"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }

});

const Router = () => {

    const PrivateRoute = ({ component, ...options }) => {
        const auth = getAuth()
        const user = auth.currentUser
    
        if (user) {
          return (<Route {...options} component={component}/>)
        } else {
          return <Redirect to='/signup'/>
        }
      }

    return (
    <ThemeProvider theme = { darkTheme }>
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path='/' component = {App}/>
            <Route exact path='/signup' component = {SignUpView}/>
            <Route exact path='/signin' component={SignInView}/>
            <Route exact path='/recipeFeed' component={RecipeFeed}/>
        </Switch>
    </BrowserRouter>
    </ThemeProvider>
)}

export default Router;