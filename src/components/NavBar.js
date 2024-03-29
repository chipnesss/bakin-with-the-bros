import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
// import MenuPopupState from "./MenuPopupState";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // (React.useState < null) | (HTMLElement > null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    if (value.length > 0) {
      fetch(
        "https://bakin-with-the-bros-default-rtdb.firebaseio.com/recipes.json"
      )
        .then((response) => response.json())
        .then((responseData) => {
          let searchQuery = value.toLowerCase();
          for (const key in responseData) {
            let recipe = responseData[key].RecipeName?.toLowerCase();
            if (
              recipe.slice(0, searchQuery.length).indexOf(searchQuery) !== -1
            ) {
              setResult((prevResult) => {
                return [{ name: responseData[key].RecipeName, id: key }];
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setResult([]);
    }
  }, [value]);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ width: "100%" }}>
          <AppBar position="static">
            <Toolbar>
              <Box
                sx={{
                  display: {
                    xs: "block",
                    sm: "block",
                    md: "block",
                    lg: "block",
                    xl: "none",
                  },
                }}
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/"
                    onClick={handleClose}
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
                    Home
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/recipeCreation"
                    onClick={handleClose}
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
                    + New Recipe
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/myRecipes"
                    onClick={handleClose}
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
                    My Recipes
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/recipeFeed"
                    onClick={handleClose}
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
                    Recipe Feed
                  </MenuItem>
                </Menu>
              </Box>
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    lg: "none",
                    xl: "block",
                  },
                }}
              >
                <Button
                  component={Link}
                  to="/"
                  variant="outlined"
                  // endIcon={<HomeIcon sx={{ color: "#ffffff" }} />}
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
                  Home{" "}
                </Button>
                <Button
                  component={Link}
                  to="/recipeCreation"
                  variant="outlined"
                  endIcon={<AddToPhotosIcon sx={{ color: "#ffffff" }} />}
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
                  Recipe
                </Button>
                <Button
                  component={Link}
                  to="/recipeFeed"
                  variant="outlined"
                  endIcon={<DynamicFeedIcon sx={{ color: "#ffffff" }} />}
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
                  Recipe Feed
                </Button>
                <Button
                  component={Link}
                  to="/myRecipes"
                  variant="outlined"
                  endIcon={<DynamicFeedIcon sx={{ color: "#ffffff" }} />}
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
                  My Recipes
                </Button>
                {/* <MenuPopupState></MenuPopupState> */}
              </Box>

              {/* <Header /> */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                }}
              >
                {" "}
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(event) => setValue(event.target.value)}
                  value={value}
                />
                <Box>
                  {result.map((result, index) => (
                    <Box
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "1.5em",
                        padding: "3px",
                      }}
                    >
                      <Link
                        style={{
                          color: "white",
                          "text-decoration": "none",
                        }}
                        key={index}
                        to={`/recipe/${result.id}`}
                      >
                        {result.name}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </>
  );
}
