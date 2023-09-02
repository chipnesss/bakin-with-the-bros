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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function RecipeReviewCard({ recipe }) {
  const history = useHistory();

  const handleRecipeClick = () => {
    history.push(`recipe/${recipe.RecipedId}`);
  };

  return (
    <Grid container justifyContent={"center"}>
      <ThemeProvider theme={darkTheme}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader title={recipe.RecipeName} subheader={recipe.Date} />
          <CardMedia
            component="img"
            height="194"
            image={
              recipe.PhotoUrl ||
              "https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/images%2Fchip2.jpg?alt=media&token=87db18d7-5abe-4497-92f0-6de978c319a0"
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
      get(child(dbRef, `recipes/`)).then((snapshot) => {
        console.log(snapshot);
        if (snapshot.exists()) {
          const recipeList = Object.entries(snapshot.val()).map(([k, v]) => ({
            RecipedId: k,
            ...v,
          }));
          // Shuffle array
          const shuffled = recipeList.sort(() => 0.5 - Math.random());

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
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      {recipes.map((recipe) => {
        return (
          <Grid item xs={12} lg={2}>
            <RecipeReviewCard recipe={recipe} />
          </Grid>
        );
      })}
      <Grid item xs={12} lg={2} spacing={1}>
        <Grid container justifyContent={"center"}>
          <Button
            component={Link}
            to="/recipeFeed"
            variant="contained"
            sx={{ width: 200, padding: 1, margin: 2 }}
          >
            View Recipe Feed{" "}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <div></div>
  );
}
