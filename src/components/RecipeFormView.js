import "../App.css";
import Header from "./Header";
import RecipeForm from "./Recipe_Form";

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
