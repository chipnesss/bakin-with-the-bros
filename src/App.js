import { Box, Button, alpha } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import SearchAppBar from "./components/NavBar";
import { Link } from "react-router-dom";
import HighlightRecipes from "./components/HighlightRecipes";
import { Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header />
        <SearchAppBar></SearchAppBar>
        <Grid
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.15)",
            margin: "auto",
            borderRadius: "5px 5px 5px 5px",
          }}
        >
          <HighlightRecipes></HighlightRecipes>
        </Grid>
      </div>
    </div>
  );
}

export default App;
