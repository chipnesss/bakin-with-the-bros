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
        <Header sx={{}}/>
        <Grid container sx={{width:"90%"}}>
        <SearchAppBar sx={{width:"100%"}}></SearchAppBar>
        
        <Grid
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.05)",
            marginTop: "25px",
            padding:"25px",
            borderRadius: "5px 5px 5px 5px",
          }}
        >
          <HighlightRecipes sx={{width:"100%"}}></HighlightRecipes>
        </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
