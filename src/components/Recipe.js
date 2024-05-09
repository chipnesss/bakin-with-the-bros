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
import { AlignHorizontalCenter } from "@mui/icons-material";
import { Helmet } from "react-helmet";

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
        <Helmet>
          <title>Bakin' With The Bros.</title>
          <meta property="og:title" content="Bakin' With The Bros." />
          <meta property="og:description" content={recipe.RecipeName} />
          <meta
            property="og:image"
            content={
              recipe.PhotoUrl ||
              "https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/images%2Fchip2.jpg?alt=media&token=87db18d7-5abe-4497-92f0-6de978c319a0"
            }
          />
        </Helmet>
        <Container>
          <CssBaseline />
          <Header />
          <SearchAppBar></SearchAppBar>
          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.10)",
              width: "100%",
              borderRadius: ".5%",
              display: "flex",
              padding: "5%",
              marginTop: "25px",
              marginBottom: "25px",
            }}
          >
            <Box
              sx={{
                maxWidth: "100%",
                width: "100%",
                color: "white",
              }}
            >
              <Box>
                <Box sx={{ textAlign: "left", color: "white" }}>
                  <Box>
                    <h2>{recipe.RecipeName}</h2>
                    <p>{recipe.Date}</p>
                  </Box>
                  <Box
                    component="img"
                    sx={{
                      margin: "5px auto",
                      background: "rgba(255, 255, 255, 0.10)",
                      borderRadius: ".5%",
                      // height: 233,
                      // width: 350,
                      maxHeight: { xs: 233, md: 167, lg: 400 },
                      maxWidth: "100%",
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
                      variant="outlined"
                      sx={{
                        color: "#FFFFFF",
                        border: "1px solid #FFFFFF",
                        "&:hover": {
                          border: "1px solid #3CA6A6",
                        },
                        width: 200,
                        padding: 1,
                        margin: 2,
                      }}
                    >
                      More Recipes{" "}
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
