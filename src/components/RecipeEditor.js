import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { getDatabase, ref, set, push, get, child } from "firebase/database";
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
import SendIcon from "@mui/icons-material/Send";
import { BorderAllRounded } from "@mui/icons-material";
import Recipes from "./Header";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function RecipeEditor(props) {
  let { RecipeId } = useParams();
  console.log(RecipeId);
  const [value, setValue] = React.useState({
    RecipeName: "",
    IngredientList: "",
    Directions: "",
    ProTips: "",
    Date: new Date().toLocaleDateString(),
    PhotoUrl: "",
  });
  const firebase = useFirebase();

  const [recipe, setRecipe] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log("I RAN");
    if (firebase) {
      console.log("FIREBASED");
      setLoading(true);
      const database = getDatabase(firebase.app);
      const dbRef = ref(database);
      get(child(dbRef, `recipes/${RecipeId}`)).then((snapshot) => {
        console.log(snapshot);
        if (snapshot.exists()) {
          const recipeObject = snapshot.val();
          console.log(recipeObject);
          console.log(snapshot.val());
          setRecipe(recipeObject);
        } else {
          console.log("No data available");
        }
      });
    }
  }, [firebase, RecipeId]);

  React.useEffect(() => {
    setValue({
      ...recipe,
      Date: new Date().toLocaleDateString(),
    });
    console.log(recipe);
    localStorage.setItem("directionsState", recipe.Directions);
    localStorage.setItem("ingredientsState", recipe.IngredientList);
    setLoading(false);
  }, [recipe]);

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

  const [directionsState, setDirectionsState] = React.useState();

  const [ingredientsState, setIngredientsState] = React.useState();

  React.useEffect(() => {
    if (!loading) {
      console.log("I TAN");
      getInitialDirectionState();
      getInitialIngredientsState();
    }
  }, [loading]);

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
  const handleSubmit = async (e) => {
    let messageContentHTML = null;
    let directvar = null;

    setShowError(false);
    setShowAlert(false);

    if (!ingredientsState || !directionsState || !value.RecipeName) {
      setShowError(true);
      return;
    }
    // Add Else:

    if (ingredientsState && ingredientsState.getCurrentContent()) {
      messageContentHTML = draftToHtml(
        convertToRaw(ingredientsState.getCurrentContent())
      );
    }
    // Add Else:
    if (directionsState && directionsState.getCurrentContent()) {
      directvar = draftToHtml(
        convertToRaw(directionsState.getCurrentContent())
      );
    }
    // Add Else:

    const auth = getAuth();
    const user = auth.currentUser;
    e.preventDefault();
    const postListRef = ref(firebase.database, "recipes");

    // TO DO: Look at firebase docs and look at ways to update values instead of creating new
    try {
      const newPostRef = await push(postListRef);
      await set(newPostRef, {
        ...value,
        IngredientList: messageContentHTML,
        Directions: directvar,
        TimeStamp: new Date().toLocaleString(),
        userId: user.uid,
      });

      setSuccessMessage(get_success_message());
      setShowAlert(true);

      setDirectionsState("");
      setIngredientsState("");
      setEditorState("");

      setValue({
        ...value,
        RecipeName: "",
        PhotoUrl: "",
      });

      localStorage.removeItem("RecipeName");
      localStorage.removeItem("PhotoUrl");
      localStorage.removeItem("directionsState");
      localStorage.removeItem("ingredientsState");
    } catch {
      setShowError(true);
    }
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
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchAppBar></SearchAppBar>
      </Grid>
      <Grid
        container
        sx={{
          alignItems: "flex-start",
          justifyContent: "left",
          marginTop: "20px",
        }}
      >
        <h2>Recipe</h2>
        <Grid
          container
          sx={{
            justifyContent: "left",
            alignItems: "flex-start",
            flexDirection: "row",
          }}
        >
          <Grid
            item
            sx={{
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "flex-start",
            }}
          >
            <TextField
              id="filled-multiline-flexible"
              label="Recipe Name"
              placeholder="Enter Recipe Name Here"
              value={value.RecipeName}
              onChange={(e) => handleChange(e, "RecipeName")}
              variant="filled"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                margin: "0px",
              }}
            />
          </Grid>
          <Grid
            item
            sx={{
              width: "auto",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "flex-start",
            }}
          >
            <Image_Upload
              mainState={value.PhotoUrl ? "uploaded" : null}
              imageUploaded={value.PhotoUrl ? 1 : null}
              selectedFile={value.PhotoUrl || null}
              onValueChange={handleChangeImg}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "left",
            marginTop: "20px",
          }}
        >
          <h2>Ingredients</h2>
          <Grid
            item
            sx={{
              width: "100%",
              justifyContent: "left",
              alignContent: "flex-start",
            }}
          >
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
      <Grid
        container
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "left",
          marginTop: "20px",
        }}
      >
        <h2>Directions</h2>
        <Grid
          item
          sx={{
            width: "100%",
            justifyContent: "left",
            alignContent: "flex-start",
          }}
        >
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

      <Grid></Grid>
      <Grid></Grid>
      <Grid
        container
        sx={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Grid
          item
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Button
            variant="contained"
            endIcon={<SendIcon sx={{ color: "#282c34" }} />}
            onClick={handleSubmit}
            sx={{
              width: 200,
              padding: 1,
              margin: 2,
              bgcolor: "#78E2D6",
              color: "#282c34",
              "&:hover": {
                backgroundColor: "#3CA6A6",
                color: "white",
              },
            }}
          >
            Submit
          </Button>

          <Button
            component={Link}
            to="/recipeFeed"
            variant="outlined"
            sx={{
              width: 200,
              padding: 1,
              margin: 2,
              color: "#FFFFFF",
              border: "1px solid #FFFFFF",
              "&:hover": {
                border: "1px solid #3CA6A6",
              },
            }}
          >
            Recipe Feed{" "}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
