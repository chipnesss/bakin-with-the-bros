import React, { useEffect, useState } from "react";
import App from "../App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RecipeView from "./RecipeView";
import RecipeForm from "./Recipe_Form";
import SignInView from "./SignInView";
import SignUpView from "./SignUpView";
import { Redirect } from "react-router-dom";
import { getAuth } from "firebase/auth";
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
      return <Redirect to="/signup" />;
    }
  };

  return (
    <FirebaseProvider>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={App} />
            <Route exact path="/signup" component={SignUpView} />
            <Route exact path="/signin" component={SignInView} />
            <PrivateRoute exact path="/recipeFeed" component={RecipeFeed} />
            <Route path="/recipe/:RecipeId" component={RecipeView} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </FirebaseProvider>
  );
};

export default Router;
