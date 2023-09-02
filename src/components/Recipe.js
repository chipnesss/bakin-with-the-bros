import * as React from "react";
import Box from "@mui/material/Box";
import { useFirebase } from "../FirebaseProvider";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import { getDatabase, ref, child, get } from "firebase/database";
import Avatar from "@mui/material/Avatar";
import { useParams, Link } from "react-router-dom";
import SearchAppBar from "./NavBar";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Recipe({}) {
  let { RecipeId } = useParams();
  console.log(RecipeId);

  const firebase = useFirebase();
  const [recipe, setRecipe] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (firebase) {
      const database = getDatabase(firebase.app);
      const dbRef = ref(database);
      get(child(dbRef, `recipes/${RecipeId}`)).then((snapshot) => {
        console.log(snapshot);
        if (snapshot.exists()) {
          const recipeObject = snapshot.val();
          console.log(snapshot.val());
          setRecipe(recipeObject);
        } else {
          console.log("No data available");
        }
      });
    }
  }, [firebase, RecipeId]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <SearchAppBar></SearchAppBar>
        <Container>
          <CssBaseline />
          <Header />
          <Box
            sx={{
              margin: "25px",
              padding: "25px",
              background: "rgba(255, 255, 255, 0.10)",
              width: "90%",
              borderRadius: ".5%",
              display: "flex",
            }}
          >
            <Box sx={{ textAlign: "left", color: "white" }}>
              {/* <Avatar
              alt="Remy Sharp"
              src="https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/images%2FChip%20Hubbard%20-%20HCA%20Headshot%20-.jpg?alt=media&token=1e32f0d3-3438-4c11-ad49-e75344f13760"
            /> */}
              <Box sx={{ textAlign: "left", color: "white" }}>
                <p>{recipe.Date}</p>
              </Box>
            </Box>
            <Box sx={{ textAlign: "center", color: "white" }}>
              <Box>
                <Box sx={{ textAlign: "left", color: "white" }}>
                  <Box>
                    <h2>{recipe.RecipeName}</h2>
                  </Box>
                  <Box
                    component="img"
                    sx={{
                      margin: "5px",
                      background: "rgba(255, 255, 255, 0.10)",
                      borderRadius: ".5%",
                      // height: 233,
                      // width: 350,
                      maxHeight: { xs: 233, md: 167, lg: 400 },
                      maxWidth: { xs: 350, md: 250, lg: 400 },
                    }}
                    alt="Looks delicous."
                    src={
                      recipe.PhotoUrl ||
                      "https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/images%2Fchip2.jpg?alt=media&token=87db18d7-5abe-4497-92f0-6de978c319a0"
                    }
                  />

                  {/* <Box style={{ margin: "10px", padding: "10px" }}>
              <h4>Pro Tips</h4>
              {recipe.ProTips}
            </Box> */}
                  <Box>
                    <Button
                      component={Link}
                      to="/recipeFeed"
                      variant="contained"
                      sx={{ width: 200, padding: 1, margin: 2 }}
                    >
                      View Recipe Feed{" "}
                    </Button>
                  </Box>

                  <h3>Ingredients:</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        recipe && recipe.IngredientList
                          ? recipe.IngredientList
                          : "",
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ textAlign: "left", color: "white" }}>
                <Box>
                  <h3>Directions:</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        recipe && recipe.Directions ? recipe.Directions : "",
                    }}
                  ></div>
                  {/* {recipe.Directions} */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
