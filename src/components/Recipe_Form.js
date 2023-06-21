import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useFirebase } from "../FirebaseProvider";
import { Link } from "react-router-dom";
import SearchAppBar from "./NavBar";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "./EditorCSS.css";
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

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState({
      editorState,
    });
  };

  // start test
  const getInitialIngredientsState = () => {
    const html = localStorage.getItem("ingredientsState");
    if (html) {
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        return editorState
      }

      else {
        return EditorState.createEmpty()
      }
    }
  }

  const getInitialDirectionState = () => {
    const html = localStorage.getItem("directionsState");
    if (html) {
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        return editorState
      }

      else {
        return EditorState.createEmpty()
      }
    }
  }


  const [directionsState, setDirectionsState] = React.useState(
    getInitialDirectionState()
  );

  const [ingredientsState, setIngredientsState] = React.useState(
    getInitialIngredientsState()
  );

  const onDirectionsStateChange = (directionsState) => {
    setEditorState({
      directionsState,
    });
    console.log("function called in general")
    localStorage.setItem("directionsState", directionsState)
  };

  const onIngredientsStateChange = (ingredientsState) => {
    setEditorState({
      ingredientsState,
    });
    console.log("function called in general")
    localStorage.setItem("ingredientsState", ingredientsState)
  };



  // end test




  const handleChange = (event, field) => {
    // setValue(event.target.value);
    setValue({ ...value, [field]: event.target.value });
  };

  const handleChangeImg = (downloadURL) => {
    // setValue(event.target.value);
    setValue({ ...value, PhotoUrl: downloadURL });
  };

  const handleSubmit = (e) => {
    let messageContentHTML = null;
    let directvar = null;

    if (editorState && editorState.getCurrentContent()) {
      messageContentHTML = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
    }
    if (directionsState && directionsState.getCurrentContent()) {
      directvar = draftToHtml(
        convertToRaw(directionsState.getCurrentContent())
      );
    }
    console.log(messageContentHTML);
    // Needs to get the photo URL
    const auth = getAuth();
    const user = auth.currentUser;
    e.preventDefault();
    const postListRef = ref(database, "recipes");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      ...value,
      IngredientList: messageContentHTML,
      Directions: directvar,
      userId: user.uid,
    });

    alert(JSON.stringify(value));
    localStorage.removeItem("directionsState")
    localStorage.removeItem("ingredientsState")
    

  };

return (
  <Box
    component="form"
    sx={{
      width: "90%",
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
      <SearchAppBar></SearchAppBar>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "50%"
      }}
    >
      <TextField
        id="filled-multiline-flexible"
        label="Recipe Name"
        placeholder="Enter Recipe Name Here"
        value={value.RecipeName}
        onChange={(e) => handleChange(e, "RecipeName")}
        variant="filled"
        style={{ justifyContent: "center", width: "70%" }}
      />

      <Image_Upload onValueChange={handleChangeImg} />
    </div>
    <div margin="auto">
      <Box sx={{ maxWidth: "100%", margin: "auto", width: "90%" }}>
        <h4>Ingredients</h4>
        <Editor
          toolbar={{
            options: ["inline", "list"],
            list: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ["unordered", "ordered"],
            },

            inline: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ["bold", "underline"],
            },
          }}
          editorState={ingredientsState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={(e) => {
            setIngredientsState && setIngredientsState(e);
            localStorage.setItem("ingredientsState", draftToHtml(
              convertToRaw(e.getCurrentContent())
            ))

          }}
        />
      </Box>

      {/* Start of directions */}
      <div margin="auto">
        <Box sx={{ maxWidth: "100%", margin: "auto", width: "90%" }}>
          <h4>Directions</h4>
          <Editor
            toolbar={{
              options: ["inline", "list"],
              list: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ["unordered", "ordered"],
              },

              inline: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ["bold", "underline"],
              },
            }}
            editorState={directionsState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={(e) => {
              setDirectionsState && setDirectionsState(e);
              console.log(e)
              localStorage.setItem("directionsState", draftToHtml(
                convertToRaw(e.getCurrentContent())
              ))
            }}
          />
        </Box>
      </div>
    </div>

    {/* End of directions */}
    <div>
      {/* <TextField
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
        /> */}
      {/* <TextField
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
        /> */}
      {/* <TextField
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
        /> */}
    </div>

    <Button
      variant="contained"
      onClick={handleSubmit}
      sx={{ width: 200, padding: 1, margin: 2 }}
    >
      Submit Your Recipe
    </Button>

    <Button
      component={Link}
      to="/recipeFeed"
      variant="outlined"
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
