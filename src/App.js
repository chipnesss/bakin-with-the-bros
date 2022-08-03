import "./App.css";
import Header from "./components/Header";
import RecipeForm from "./components/Recipe_Form";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header />
        <RecipeForm />
      </div>
    </div>
  );
}

export default App;
