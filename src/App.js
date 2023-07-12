import { Box, Button, alpha } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import SearchAppBar from "./components/NavBar";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header />
        <SearchAppBar></SearchAppBar>
        <Box sx={{
          bgcolor:"#444333",
          margin: "auto",
          borderRadius: '5px 5px 5px 5px',
        }}><Button
      component={Link}
      to="/recipeCreation"
      variant="contained"
      sx={{ width: 200, padding: 1, margin: 2 }}
      
    >
      Create A Recipe{" "}
    </Button>
        <Button
      component={Link}
      to="/recipeFeed"
      variant="contained"
      sx={{ width: 200, padding: 1, margin: 2 }}
      
    >
      View Recipe Feed{" "}
    </Button>
     </Box>
        </div></div>
  );
}

export default App;
