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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Router = () => {
  const PrivateRoute = ({ component, ...options }) => {
    const firebase = useFirebase();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const redirectToDesiredScreen = () => {
      const auth = getAuth();
      const isUserInSession = Object.keys(sessionStorage).filter((ssi) =>
        ssi.includes("firebase:authUser")
      );

      if (isUserInSession) {
        onAuthStateChanged(auth, (user) => {
          // if () {

          // }
          if (user) {
            return <Route {...options} component={component} />;
            // ...
          } else {
            return <h1>loading...</h1>;
          }
        });
        return <h1>loading...</h1>;
      } else {
        return <Redirect to="/signup" />;
      }
    };

    useEffect(() => {
      console.log(firebase);
      if (firebase) {
        const auth = getAuth(firebase.app);
        const user = auth.currentUser;
        console.log(user);
        setUser(user);
        setLoading(false);
      }
    }, [firebase]);
    // const auth = getAuth();

    if (loading || !firebase) {
      return <h1>loading...</h1>;
    }
    // console.log("console log" + user);
    if (user && !loading) {
      return <Route {...options} component={component} />;
    } else {
      return redirectToDesiredScreen();
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
