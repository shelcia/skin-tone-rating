import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { error } from "../theme/themeColors";

interface CommonSwitchComponentProps {
  question: string;
  //   choices: string[];
  selectedOption?: string | number;
  onOptionChange?: (selectedOption: string) => void;
  additionalTextField?: boolean;
  helperText?: string;
  isError?: boolean;
  horizontal?: boolean;
}

const CommonSkinType: React.FC<CommonSwitchComponentProps> = ({
  question,
  selectedOption,
  onOptionChange,
  helperText = "Select one option at least",
  isError = false,
  horizontal = true,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onOptionChange)
      onOptionChange((event.target as HTMLInputElement).value);
  };

  const colors = [
    "#f6ede4",
    "#f3e7db",
    "#f7ead0",
    "#eadaba",
    "#d7bd96",
    "#a07e56",
    "#825c43",
    "#604134",
    "#3a312a",
    "#292420",
  ];

  return (
    <>
      <FormControl error={isError} sx={{ mb: 8 }}>
        {question !== "" && (
          <FormLabel id="radio-buttons-group-label">
            <Typography
              component="span"
              sx={{ color: isError ? error.main : "#000", fontWeight: 600 }}
            >
              {question}{" "}
            </Typography>
            <Typography
              component="span"
              sx={{ color: "#94A4C4", fontStyle: "italic" }}
            >
              Select one option.
            </Typography>
          </FormLabel>
        )}

        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          name="radio-buttons-group"
          value={selectedOption}
          onChange={handleChange}
          sx={{
            flexDirection: horizontal ? "row" : "column",
            fontWeight: 500,
            position: "relative",
          }}
        >
          {colors.map((choice) => (
            <FormControlLabel
              key={choice}
              value={choice}
              control={<Radio sx={{ zIndex: 2 }} />}
              label={<Label color={choice} label={choice} />}
              sx={{ position: "relative" }}
            />
          ))}
        </RadioGroup>
        {isError && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default CommonSkinType;

const Label = ({ color }: { color: string; label: string }) => (
  <Box
    sx={{
      backgroundColor: color,
      height: 100,
      width: 60,
      //   borderRadius: 40,
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 0,
    }}
  ></Box>
);
