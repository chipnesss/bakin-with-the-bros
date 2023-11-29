import React, { useEffect, useState } from "react";
import App from "../App";
import { Grid } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RecipeView from "./RecipeView";
import MyRecipesView from "./MyRecipesView";
import RecipeFeedView from "./RecipeFeedView";
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
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { getDatabase, ref, set, push } from "firebase/database";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const authPromise = (auth, database) =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        // Working on recalling and storing user display names

        // const userListRef = ref(database, "users");
        // const newUserRef = push(userListRef);
        // set(newUserRef, {
        //   userId: user.uid,
        //   photo: user.photoURL,
        //   userName: user.displayName,
        // });
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
    const database = useFirebase();

    useEffect(() => {
      setLoading(true);
      console.log(firebase);

      if (firebase) {
        const auth = getAuth();
        authPromise(auth, database).then(({ user }) => {
          console.log({ user });

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
    //
    if (loading || !firebase) {
      return (
        <Grid
          containter
          sx={{
            bgcolor: "#282c34",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Grid item sx={{ width: "20%", margin: "10% 40%" }}>
            <img
              style={{ width: "100%" }}
              src="https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/images%2FBWTB-PanCham.gif?alt=media&token=f0aa8a14-721e-4241-9cc9-1124fb62f1f1"
            />
          </Grid>
        </Grid>
      );
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
            {/* <Route exact path="/recipeFeed" component={RecipeFeed} /> */}
            <Route exact path="/recipeFeed" component={RecipeFeedView} />
            <Route path="/recipe/:RecipeId" component={RecipeView} />
            <PrivateRoute exact path="/myRecipes" component={MyRecipesView} />
            {/* <PrivateRoute path="/editRecipe/:RecipeId" component={EditRecipe} /> */}
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </FirebaseProvider>
  );
};

export default Router;
