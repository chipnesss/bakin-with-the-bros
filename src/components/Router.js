import React, { useEffect, useState } from "react";
import App from "../App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RecipeView from "./RecipeView";
import RecipeForm from "./Recipe_Form";
import RecipeFormView from "./RecipeFormView";
import SignInView from "./SignInView";
import SignUpView from "./SignUpView";
import { Redirect } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import RecipeFeed from "./RecipeFeed";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FirebaseProvider, useFirebase } from "../FirebaseProvider";
import { useHistory } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const authPromise = (auth) =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        resolve({ user, userIsHere: true });
      }
    });
    setTimeout(() => {
      resolve({ user: null, userIsHere: false });
    }, 3000);
  });

const Router = () => {
  const PrivateRoute = ({ component, ...options }) => {
    const firebase = useFirebase();
    const [loading, setLoading] = useState(true);
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    let history = useHistory();

    useEffect(() => {
      setLoading(true);
      console.log(firebase);

      if (firebase) {
        const auth = getAuth();
        authPromise(auth).then(({ user }) => {
          console.log(user);
          setAuthenticatedUser(user);
          // Stop loader
          setLoading(false);
        });
      }
    }, [firebase]);

    // Move the await into a useEffect and based on the results of the authPromise we need to change state
    // but would ultimately return redirect from the render

    // Show loader

    // const auth = getAuth();

    if (loading || !firebase) {
      return <h1>loading...</h1>;
    }
    // console.log("console log" + user);
    if (authenticatedUser && !loading) {
      return <Route {...options} component={component} />;
    } else {
      return <Redirect to={`/signup?origin=${history.location.pathname}`} />;
    }
  };

  return (
    <FirebaseProvider>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={App} />
            <PrivateRoute
              exact
              path="/recipeCreation"
              component={RecipeFormView}
            />
            <Route exact path="/signup" component={SignUpView} />
            <Route exact path="/signin" component={SignInView} />
            <Route exact path="/recipeFeed" component={RecipeFeed} />
            <Route path="/recipe/:RecipeId" component={RecipeView} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </FirebaseProvider>
  );
};

export default Router;
