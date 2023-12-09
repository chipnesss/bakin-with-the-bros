import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { ReceiptLongOutlined } from "@mui/icons-material";
import { getDatabase, ref, child, get } from "firebase/database";
import { useFirebase } from "../FirebaseProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function RecipeReviewCard({ recipe }) {
  const [expanded, setExpanded] = React.useState(false);

  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRecipeClick = () => {
    history.push(`recipe/${recipe.RecipedId}`);
  };

  return (
    <Grid container spacing={"2"}>
      <Card>
        <CardHeader
          // avatar={}
          action={
            <IconButton aria-label="settings">
              {/* <MoreVertIcon /> */}
            </IconButton>
          }
          title={recipe.RecipeName}
          // subheader={recipe.Date}
        />
        <CardMedia
          item
          component="img"
          sx={{ height: "250px" }}
          image={
            recipe.PhotoUrl ||
            "https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/images%2FBWTB%20PanCham-01.png?alt=media&token=935d360e-9c5d-4f2e-92a6-49be1f0101fd"
          }
          alt="Recipe Photos"
          onClick={handleRecipeClick}
        />
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Avatar alt={recipe.userDisplayName} src={recipe.userPhoto} />
            <Typography
              sx={{
                alignItems: "center",
                paddingTop: "10px",
                paddingLeft: "10px",
              }}
              variant="body2"
              color="text.secondary"
            >
              {`Posted by: ${recipe.userDisplayName}`}
            </Typography>
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <Typography variant="body2" color="text.secondary">
            Ingredients List
          </Typography>
          {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
          {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            // theme= darkTheme
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <h3>Ingredients</h3>
            </Typography>
            <Typography paragraph>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    recipe && recipe.IngredientList
                      ? recipe.IngredientList
                      : "",
                }}
              />
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                // theme= darkTheme
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}

export default function RecipeFeed() {
  const firebase = useFirebase();
  const [recipes, setRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // const starCountRef = ref(database, 'recipes/');
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  // });

  React.useEffect(() => {
    if (firebase) {
      const database = getDatabase(firebase.app);
      const dbRef = ref(database);
      get(child(dbRef, `recipes/`)).then(async (snapshot) => {
        if (snapshot.exists()) {
          const recipeList = Object.entries(snapshot.val()).map(([k, v]) => ({
            RecipedId: k,
            ...v,
          }));
          const recipeListSorted = recipeList.sort((a, b) =>
            new Date(a.TimeStamp) < new Date(b.TimeStamp) ? 1 : -1
          );
          const recipeListWithUsers = await Promise.all(
            recipeListSorted.map(async (recipe) => {
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

          setRecipes(recipeListWithUsers);
          console.log(recipeListWithUsers);
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
    </Grid>
  ) : (
    <div></div>
  );
}
