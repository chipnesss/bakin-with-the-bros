import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import { IconButton } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Recipes() {
  return (
    <Box
                    component="img"
                    sx={{
                      margin: "5px auto",
                      background: "rgba(255, 255, 255, 0.10)",
                      borderRadius: ".5%",
                      // height: 233,
                      // width: 350,
                      maxHeight: "200px",
                      maxWidth: "100%",
                    }}
                    alt="Looks delicous."
                    src={
                      
"https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/images%2FBakinWithTheBrosLogo-01-01.png?alt=media&token=65260457-a9a9-40c7-84ee-87f2eab6f8de"                    }
                  />
    // <h1>
    //   {/* <a href="http://localhost:3000/">Bakin' With The Bros.</a>{" "} */}
    //   Bakin' With The Bros.
    //   <IconButton >
    //     <BrunchDiningIcon
    //     sx={{
    //       color: "#FFFFFF",
    //       fontSize: "55px",
          
    //     }}
    //   />
        
    //   </IconButton>
    // </h1>
  );
}
