import "../App.css";
import Header from "./Header";
import RecipeForm from "./Recipe_Form";
import SearchAppBar from "./NavBar";
import RecipeEditor from "./RecipeEditor";

function RecipeFormView() {
  return (<>
    <div className="App">
      <div className="App-header">
        <Header />
        <RecipeEditor />
      </div>
    </div></>
  );
}

export default RecipeFormView;
