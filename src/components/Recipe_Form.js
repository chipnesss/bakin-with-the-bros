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
import Alert from "@mui/material/Alert";
import ActionAlerts from "./Alerts";
import { useState } from "react";
import { Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { BorderAllRounded } from "@mui/icons-material";

export default function RecipeForm(props) {
  const [value, setValue] = React.useState({
    RecipeName: localStorage.getItem("RecipeName") || "",
    IngredientList: "",
    Directions: "",
    ProTips: "",
    Date: new Date().toLocaleDateString(),
    PhotoUrl: localStorage.getItem("PhotoUrl") || "",
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
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
      } else {
        return EditorState.createEmpty();
      }
    }
  };

  const getInitialDirectionState = () => {
    const html = localStorage.getItem("directionsState");
    if (html) {
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
      } else {
        return EditorState.createEmpty();
      }
    }
  };

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
    console.log("function called in general");
    localStorage.setItem("directionsState", directionsState);
  };

  const onIngredientsStateChange = (ingredientsState) => {
    setEditorState({
      ingredientsState,
    });
    console.log("function called in general");
    localStorage.setItem("ingredientsState", ingredientsState);
  };

  // end test

  const handleChange = (event, field) => {
    // setValue(event.target.value);
    setValue({ ...value, [field]: event.target.value });
    localStorage.setItem(field, event.target.value);
  };

  const handleChangeImg = (downloadURL) => {
    // setValue(event.target.value);
    setValue({ ...value, PhotoUrl: downloadURL });
    localStorage.setItem("PhotoUrl", downloadURL);
  };

  // Alert Testing Start
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleButtonClick = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };
  // Alert Testing End

  // function submit_and_alert(e) {
  //   handleSubmit()
  //   handleButtonClick()
  const success_messages = [
    "Dang, thats a good lookin' recipe...",
    "It appears you did not add enough garlic...",
    "Thank you for seasoning your chicken...",
    "Hear me out... Why not more salt?",
    "Wow, what a recipe!",
    "Clearly you're a professional!",
    "Dang, where did you learn to cook like that?",
  ];
  const get_success_message = () => {
    return success_messages.sort(() => 0.5 - Math.random())[0];
  };
  //  recipeList.sort(() => 0.5 - Math.random());

  // }
  const handleSubmit = (e) => {
    let messageContentHTML = null;
    let directvar = null;

    setShowError(false);
    setShowAlert(false);

    if (!ingredientsState || !directionsState || !value.RecipeName) {
      setShowError(true);
      return;
    }

    if (ingredientsState && ingredientsState.getCurrentContent()) {
      messageContentHTML = draftToHtml(
        convertToRaw(ingredientsState.getCurrentContent())
      );
    }
    if (directionsState && directionsState.getCurrentContent()) {
      directvar = draftToHtml(
        convertToRaw(directionsState.getCurrentContent())
      );
    }
    // console.log(messageContentHTML);
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

    setSuccessMessage(get_success_message());
    setShowAlert(true);

    setDirectionsState("")
    setIngredientsState("")
    setEditorState("")
    value.RecipeName = ""
    value.PhotoUrl = ""
    localStorage.removeItem("RecipeName");
    localStorage.removeItem("PhotoUrl");
    localStorage.removeItem("directionsState");
    localStorage.removeItem("ingredientsState");
  };

  return (
    // Alert Testing Start

    // Alert Testing
    <Box
      component="form"
      sx={{
        width: "90%",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchAppBar></SearchAppBar>
      </Grid>
      <Grid container sx={{ alignItems:"flex-start", justifyContent:"left", marginTop:"20px"}}>
      <h2>Recipe</h2>
     <Grid container sx={{
           justifyContent:"left", alignItems:"flex-start", flexDirection:"row"
        }}>
        <Grid item
        sx={{
           flexDirection:"row", justifyContent:"left", alignItems:"flex-start"
        }}
      >
        <TextField
          id="filled-multiline-flexible"
          label="Recipe Name"
          placeholder="Enter Recipe Name Here"
          value={value.RecipeName}
          onChange={(e) => handleChange(e, "RecipeName")}
          variant="filled"
          style={{ display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        margin:"0px"}}
        />
      </Grid>
      <Grid item sx={{width:"auto", flexDirection:"row", justifyContent:"left", alignItems:"flex-start"}}><Image_Upload
          mainState={value.PhotoUrl ? "uploaded" : null}
          imageUploaded={value.PhotoUrl ? 1 : null}
          selectedFile={value.PhotoUrl || null}
          onValueChange={handleChangeImg}
          
        /></Grid>
        </Grid>
      
      
      <Grid container sx={{flexDirection:"column", alignItems:"flex-start", justifyContent:"left", marginTop:"20px"}}>
      <h2 >Ingredients</h2>
        <Grid item sx={{width: "100%", justifyContent:"left", alignContent:"flex-start"}}>
          
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
              localStorage.setItem(
                "ingredientsState",
                draftToHtml(convertToRaw(e.getCurrentContent()))
              );
            }}
          />
        </Grid>
</Grid>
</Grid>
        {/* Start of directions */}
        <Grid container sx={{ flexDirection:"column", alignItems:"flex-start", justifyContent:"left", marginTop:"20px"}}>
        <h2>Directions</h2>
          <Grid item sx={{width:"100%", justifyContent:"left", alignContent:"flex-start"}}>
            
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
                localStorage.setItem(
                  "directionsState",
                  draftToHtml(convertToRaw(e.getCurrentContent()))
                );
              }}
            />
            <Grid>
              {showError && (
                <Alert
                  severity="error"
                  sx={{ margin: "auto", width: "auto" }}
                  onClose={handleCloseError}
                >
                  Make sure your recipe is completely filled out!
                </Alert>
              )}
            </Grid>
            <Grid>
              {showAlert && (
                <Alert
                  severity="success"
                  sx={{ margin: "auto", width: "auto" }}
                  onClose={handleCloseAlert}
                >
                  {successMessage}
                </Alert>
              )}
            </Grid>
          </Grid>
        </Grid>
      
      <Grid>
      </Grid>
      <Grid></Grid>
<Grid container sx={{alignItems:"center", justifyContent:"center", marginTop:"20px"}}>
  <Grid item sx={{flexDirection:"row", justifyContent:"center", alignItems:"flex-start"}}>
      <Button
        variant="contained"
        endIcon={<SendIcon sx={{color:"#282c34"}}/>}
        onClick={handleSubmit}
        sx={{ width: 200, padding: 1, margin: 2, bgcolor:"#78E2D6", color:"#282c34", '&:hover': {
          backgroundColor: '#3CA6A6', color:"white"}}}
      >
        Submit
      </Button>

      <Button
        component={Link}
        to="/recipeFeed"
        variant="outlined"
        sx={{ width: 200, padding: 1, margin: 2,  color:"#FFFFFF", border:"1px solid #FFFFFF", '&:hover': {
          border:"1px solid #3CA6A6"} }}
      >
      Recipe Feed{" "}
      </Button>
      </Grid>
      </Grid>


      
    </Box>
    
  );
}
