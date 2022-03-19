import './App.css';
import Header from './components/Header';
import RecipeForm from './components/Recipe_Form'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './components/SignIn';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }

});

function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <ThemeProvider theme = { darkTheme }>
          
          <Header/>
          <RecipeForm/>
          
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;