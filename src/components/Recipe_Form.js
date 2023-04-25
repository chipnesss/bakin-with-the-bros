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
    RecipeName: "",
    IngredientList: "",
    Directions: "",
    ProTips: "",
    Date: new Date().toLocaleDateString(),
    PhotoUrl: "",
  });
  const database = useFirebase();

  const handleChange = (event, field) => {
    // setValue(event.target.value);
    setValue({ ...value, [field]: event.target.value });
  };

  const handleChangeImg = (downloadURL) => {
    // setValue(event.target.value);
    setValue({ ...value, PhotoUrl: downloadURL });
  };

  const handleSubmit = (e) => {
    // Needs to get the photo URL
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="filled-multiline-flexible"
          label="Recipe Name"
          placeholder="Enter Recipe Name Here"
          value={value.RecipeName}
          onChange={(e) => handleChange(e, "RecipeName")}
          variant="filled"
          style={{ justifyContent: "center" }}
        />

        <Image_Upload onValueChange={handleChangeImg} />
      </div>
      <div>
        <TextField
          id="filled-textarea"
          label="Ingredient List"
          placeholder="Enter your ingredients here
          - Item 1
          - Item 2
          - Item 3"
          multiline
          rows={15}
          value={value.IngredientList}
          onChange={(e) => handleChange(e, "IngredientList")}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Directions"
          placeholder="Add your instructions
          - Step 1
          - Step 2
          - Step 3"
          multiline
          rows={15}
          value={value.Directions}
          onChange={(e) => handleChange(e, "Directions")}
          // defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Pro Tips"
          placeholder="List a step and a potential challenge with the recipe
          Example: 
          - Step 3: Make sure that the dough has doubled in size. This is more important than the time spent rising."
          multiline
          rows={15}
          value={value.ProTips}
          onChange={(e) => handleChange(e, "ProTips")}
          // defaultValue="Default Value"
          variant="filled"
        />
      </div>

      <Button
        variant="outlined"
        onClick={handleSubmit}
        sx={{ width: 200, padding: 1, margin: 2 }}
      >
        Submit Your Recipe
      </Button>

      <Button
        component={Link}
        to="/recipeFeed"
        variant="contained"
        sx={{ width: 200, padding: 1, margin: 2 }}
      >
        View Recipe Feed{" "}
      </Button>

      {/* <Button
        component={Link}
        to="/recipe"
        variant="contained"
        sx={{ width: 200, padding: 1, margin: 2 }}
      >
        Check Out A Recipe{" "}
      </Button> */}
    </Box>
  );
}
