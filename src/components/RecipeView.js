import '../App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './SignIn';
import Recipe from './Recipe';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }

});

function RecipeView() {
  return (
    <div className='App'>
      <div className='App-header'>
        <ThemeProvider theme = { darkTheme }>
          <Recipe/>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default RecipeView;