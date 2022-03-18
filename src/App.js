import './App.css';
import Recipes from './components/Recipes';
import Header from './components/Header';
import BasicCard from './components/card';
import Recipe_Form from './components/Recipe_Form'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
          <Recipe_Form/>
        
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;