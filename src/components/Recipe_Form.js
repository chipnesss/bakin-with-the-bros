import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useFirebase } from "../FirebaseProvider";
import { Link } from "react-router-dom";

//Test Import
import Image_Upload from "./Image_Upload";

export default function RecipeForm(props) {
  const [value, setValue] = React.useState({
    RecipeName: "Recipe Name",
    IngredientList: "Ingredient List",
    Directions: "Directions",
  });
  const database = useFirebase();

  const handleChange = (event, field) => {
    // setValue(event.target.value);
    setValue({ ...value, [field]: event.target.value });
  };

  const handleSubmit = (e) => {
    const auth = getAuth();
    const user = auth.currentUser;
    e.preventDefault();
    const postListRef = ref(database, "recipes");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      ...value,
      userId: user.uid,
    });
    alert(JSON.stringify(value));
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-multiline-flexible"
          label="Recipe Name"
          placeholder="Enter Recipe Name Here"
          value={value.RecipeName}
          onChange={(e) => handleChange(e, "RecipeName")}
          variant="filled"
        />
      </div>
      <div>
        <TextField
          id="filled-textarea"
          label="Ingredient List"
          placeholder="Placeholder"
          multiline
          rows={15}
          value={value.IngredientList}
          onChange={(e) => handleChange(e, "IngredientList")}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Directions"
          multiline
          rows={15}
          value={value.Directions}
          onChange={(e) => handleChange(e, "Directions")}
          defaultValue="Default Value"
          variant="filled"
        />
      </div>
      <Image_Upload />
      <Button variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
      <Link to="/recipeFeed"> Your Recipe Feed </Link>
    </Box>
  );
}
