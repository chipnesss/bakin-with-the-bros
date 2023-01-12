// imports the React Javascript Library
import React from "react";
//Card
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CollectionsIcon from "@mui/icons-material/Collections";

function ImageUploadCard(props) {
  const [mainState, setMainState] = React.useState("initial");
  const [imageUploaded, setImageUploaded] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState(null);

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
  };

  const handleSearchClick = (event) => {
    setMainState("search");
  };

  const handleGalleryClick = (event) => {
    setMainState("gallery");
  };

  function renderInitialState() {
    return (
      <React.Fragment>
        <CardContent>
          <Grid container justify="center" alignItems="center">
            <input
              style={{ display: "none" }}
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Fab component="span">
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  }

  function renderUploadedState() {
    return (
      <React.Fragment>
        <CardActionArea onClick={imageResetHandler}>
          <img width="100%" src={selectedFile} />
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
        <Card>
          {(mainState == "initial" && renderInitialState()) ||
            (mainState == "uploaded" && renderUploadedState())}
        </Card>
      </div>
    </React.Fragment>
  );
}

export default ImageUploadCard;
