import "../App.css";
import Header from "./Header";
import RecipeForm from "./Recipe_Form";
import SearchAppBar from "./NavBar";

function RecipeFormView() {
  return (
    <div className="App">
      <div className="App-header">
        <Header />
        <RecipeForm />
      </div>
    </div>
  );
}

export default RecipeFormView;
