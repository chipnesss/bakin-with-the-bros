import './App.css';
import Header from './components/Header';
import RecipeForm from './components/Recipe_Form'
import SignIn from './components/SignIn';
import initializeFirebase from './firebase/connection'






const database = initializeFirebase()

function App() {

  return (
    <div className='App'>
      <div className='App-header'>
        
          
          <Header/>
          <RecipeForm database = { database }/>
          
      
      </div>
    </div>
  );
}

export default App;