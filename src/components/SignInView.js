import '../App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './SignIn';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }

});

function SignInView() {
  return (
    <div className='App'>
      <div className='App-header'>
        <ThemeProvider theme = { darkTheme }>
          <SignIn/>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default SignInView;