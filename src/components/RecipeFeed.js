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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { ReceiptLongOutlined } from "@mui/icons-material";
import { getDatabase, ref, child, get } from "firebase/database";
import { useFirebase } from "../FirebaseProvider";

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
            {}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={recipe.RecipeName}
        subheader="Date ( fix me )"
        // subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/chip2.jpg?alt=media"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {""}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
          <Typography paragraph>Ingredients:</Typography>
          <Typography paragraph>{recipe.IngredientList}</Typography>
        </CardContent>
      </Collapse>
    </Card>
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
      get(child(dbRef, `recipes/`)).then((snapshot) => {
        console.log(snapshot);
        if (snapshot.exists()) {
          const recipeObject = snapshot.val();
          const recipeList = Object.values(recipeObject);
          setRecipes(recipeList);
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      });
    }
  }, [firebase]);

  return recipes.length ? (
    <div class="Container">
      {recipes.map((recipe) => {
        return (
          <>
            <div className="Item">
              <RecipeReviewCard recipe={recipe} />
            </div>
          </>
        );
      })}
    </div>
  ) : (
    <div></div>
  );
}
