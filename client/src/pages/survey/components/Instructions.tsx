import React from "react";
import {
  Alert,
  Box,
  // List,
  // ListItem,
  // ListItemIcon,
  // ListItemText,
  Typography,
} from "@mui/material";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Instructions: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Alert severity="warning" variant="standard">
        Please Read them carefully.
      </Alert>
      <Typography>
        In this study, you will assess an individual's photos by assigning a
        skin tone rating on a 10-point scale, identifying the perceived racial
        group of the person in the photo, and determining the level of
        Eurocentric or Afrocentric features exhibited by the individual.
        Detailed definitions for each rating are provided below.
      </Typography>
      <Typography>
        <b>Skin Tone</b> - Skin tone will be rated on a scale ranging from
        categories A to J. Please match the skin color of the individual in the
        photo to one of the orbs provided below to the best of your ability.
      </Typography>

      <Typography>
        <b>Race</b> - The racial category options include White&#47;Caucasian,
        Black&#47;African-American, Hispanic&#47;Latin@, Asian&#47;Pacific
        Islander, Indigenous&#47;Native American&#47;American Indian, Other.
        While we acknowledge that you are working with limited information, we
        kindly ask you to assign a racial group based on your perception and gut
        feeling.
      </Typography>

      <Typography>
        <b>Eurocentric and Afrocentric Features</b> - We define Afrocentric
        features as those characterized by very full lips and a broad or flat
        nose shape, while Eurocentric features are described as thin lips and a
        more narrow nose. You will rate the individual in the photo on a scale
        of 1-7, with one (1) indicating Very Eurocentric and seven (7)
        indicating very Afrocentric.
      </Typography>
      {/* 
      <List>
        {FACTORS.map((itm) => (
          <ListItem disablePadding key={itm}>
            <ListItemIcon>
              <TaskAltIcon sx={{ fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText primary={itm} sx={{ m: 0 }} />
          </ListItem>
        ))}
      </List> */}
      {/* <Typography
        sx={{ fontSize: "1.25rem", fontWeight: 600, fontStyle: "italic" }}
      >
        On the following page, you'll have the chance to practice rating before
        we proceed to the actual study.
      </Typography> */}
      <Alert severity="success" variant="filled">
        On the following page, you'll have the chance to practice rating before
        we proceed to the actual study.
      </Alert>
    </Box>
  );
};

export default Instructions;
