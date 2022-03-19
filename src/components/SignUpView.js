import '../App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUp from './SignUp';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }

});

function SignUpView() {
  return (
    <div className='App'>
      <div className='App-header'>
        <ThemeProvider theme = { darkTheme }>
          <SignUp/>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default SignUpView;