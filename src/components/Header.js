import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Recipes() {
  return (
    <h1>
      {/* <a href="http://localhost:3000/">Bakin' With The Bros.</a>{" "} */}
      Bakin' With The Bros.
      <FastfoodIcon />
    </h1>
  );
}
