import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { ReceiptLongOutlined } from "@mui/icons-material";
import { getDatabase, ref, child, get } from "firebase/database";
import { useFirebase } from "../FirebaseProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import SearchAppBar from "./NavBar";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { RecipeReviewCard } from "./RecipeFeed";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function DepRecipeReviewCard({ recipe }) {
  const history = useHistory();

  const handleRecipeClick = () => {
    history.push(`recipe/${recipe.RecipedId}`);
  };

  return (
    <Grid container spacing={"2"}>
      <ThemeProvider theme={darkTheme}>
        <Card>
          <CardHeader title={recipe.RecipeName} />
          <CardMedia
            component="img"
            sx={{
              sm: { width: "250px", height: "250px" },
              md: { width: "200px", height: "200px" },
            }}
            image={
              recipe.PhotoUrl ||
              "https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/images%2FBWTB%20PanCham-01.png?alt=media&token=935d360e-9c5d-4f2e-92a6-49be1f0101fd"
            }
            alt="Paella dish"
            onClick={handleRecipeClick}
          />
        </Card>
      </ThemeProvider>
    </Grid>
  );
}

export default function HighlightRecipes() {
  const firebase = useFirebase();
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    if (firebase) {
      const database = getDatabase(firebase.app);
      const dbRef = ref(database);
      get(child(dbRef, `recipes/`)).then(async (snapshot) => {
        console.log(snapshot);
        if (snapshot.exists()) {
          const recipeList = Object.entries(snapshot.val()).map(([k, v]) => ({
            RecipedId: k,
            ...v,
          }));
          const recipeListWithUsers = await Promise.all(
            recipeList.map(async (recipe) => {
              const snapshot = await get(
                child(dbRef, `user_meta/${recipe.userId}`)
              );
              console.log(snapshot);
              if (snapshot.exists()) {
                console.log(snapshot.val());
                return {
                  ...recipe,
                  userPhoto: snapshot.val().photoURL,
                  userDisplayName: snapshot.val().displayName,
                };
              }
              return recipe;
            })
          );
          // Shuffle array
          const shuffled = recipeListWithUsers.sort(() => 0.5 - Math.random());

          // Get sub-array of first n elements after shuffled
          let selected = shuffled.slice(0, 5);
          setRecipes(selected);
          console.log(selected);
        } else {
          console.log("No data available");
        }
      });
    }
  }, [firebase]);

  return recipes.length ? (
    <Grid
      container
      spacing={4}
      border={"25px"}
      margin={"15px"}
      alignItems="center"
      justifyContent="center"
      bgcolor={"rgba(255, 255, 255, 0.05)"}
      width={"90%"}
      columns={{ xs: 4, md: 8, lg: 12 }}
    >
      {recipes.map((recipe) => {
        return (
          <Grid
            item
            xs={6}
            lg={2}
            spacing={4}
            alignItems="center"
            justifyContent="center"
            margin={"15px"}
          >
            <RecipeReviewCard recipe={recipe} />
          </Grid>
        );
      })}
      <Grid container spacing={1} margin={1}>
        <Grid container justifyContent={"center"}>
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

              padding: 1,
              margin: 2,
            }}
          >
            Check out more recipes!{" "}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <div></div>
  );
}
