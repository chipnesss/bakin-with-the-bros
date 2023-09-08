// imports the React Javascript Library
import React from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//Card
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CollectionsIcon from "@mui/icons-material/Collections";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

function ImageUploadCard(props) {
  const [mainState, setMainState] = React.useState(
    props.mainState || "initial"
  );
  const [imageUploaded, setImageUploaded] = React.useState(
    props.imageUploaded || 0
  );
  const [selectedFile, setSelectedFile] = React.useState(
    props.selectedFile || null
  );

  const handleUploadClick = (event) => {
    console.log();
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedFile([reader.result]);
    };
    console.log(url); // Would see a path?

    setMainState("uploaded");
    setSelectedFile(event.target.files[0]);
    setImageUploaded(1);

    // Callan + Chip Pickup Here
    // Upload Image to Firebase

    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          props.onValueChange(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleSearchClick = (event) => {
    setMainState("search");
  };

  const handleGalleryClick = (event) => {
    setMainState("gallery");
  };

  function renderInitialState() {
    return (
      <React.Fragment sx={{bgcolor:"transparent"}}>
        <Grid container sx={{bgcolor:"transparent"}} justify="center" alignItems="center">
          <input
            style={{ display: "none", bgcolor:"transparent" }}
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />
          <label htmlFor="contained-button-file">
            <Fab component="span">
              <AddPhotoAlternateIcon sx={{color:"#282c34"}}/>
            </Fab>
          </label>
        </Grid>
      </React.Fragment>
    );
  }

  function renderUploadedState() {
    return (
      <React.Fragment>
        <CardActionArea sx={{bgcolor:"transparent", marginTop:"10px"}} onClick={imageResetHandler}>
          <img width="20%" src={selectedFile} />
        </CardActionArea>
      </React.Fragment>
    );
  }

  const imageResetHandler = (event) => {
    setMainState("initial");
    setSelectedFile(null);
    setImageUploaded(0);
  };

  return (
    <React.Fragment>
      <div>
        <Card sx={{bgcolor:"transparent", backgroundImage:"unset"}}>
          {(mainState == "initial" && renderInitialState()) ||
            (mainState == "uploaded" && renderUploadedState())}
        </Card>
      </div>
    </React.Fragment>
  );
}

export default ImageUploadCard;
