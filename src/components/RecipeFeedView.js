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
import RecipeFeed from "./RecipeFeed";
import Header from "./Header";
import { Grid } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function RecipeFeedView() {
  return (
    <div className="App">
      <div className="App-header">
        <ThemeProvider theme={darkTheme}>
          <Header></Header>
        
          <SearchAppBar ></SearchAppBar>
          
          <RecipeFeed></RecipeFeed>
        </ThemeProvider>
     </div>
     </div>


  );
}

export default RecipeFeedView;
