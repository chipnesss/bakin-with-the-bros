import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";


const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));





export default function SearchAppBar() {
    const [value, setValue] = React.useState("");
    const [result, setResult] = React.useState([]);
    React.useEffect(() => {
        if (value.length > 0) {
            fetch('https://bakin-with-the-bros-default-rtdb.firebaseio.com/recipes.json').then(
                response => response.json()
            ).then(responseData => {
                let searchQuery = value.toLowerCase();
                for (const key in responseData) {
                    let recipe = responseData[key].RecipeName?.toLowerCase();
                    if (recipe.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                        setResult(prevResult => {
                            return [...prevResult, responseData[key].RecipeName]
                        })
                    }
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            setResult([]);
        }
    }, [value])
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            {/* <Header /> */}
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                Celebrated recipes          </Typography>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(event) => setValue(event.target.value)}
                                    value={value}
                                />
                                <Box>
                                    {result.map((result, index) =>(
                                        <a href={'#'} key={index}>
                                            <div>
                                                {result}
                                            </div>

                                        </a>
                                    ))}
                                </Box>
                            </Search>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider></>
    );
}