import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  // FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { error } from "../theme/themeColors";
import { COLORS } from "../constants";

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
  // helperText = "Select one option at least",
  isError = false,
  horizontal = true,
}) => {
  // console.log({ helperText });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onOptionChange)
      onOptionChange((event.target as HTMLInputElement).value);
  };

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
            gap: 0,
          }}
        >
          {COLORS.map((color, idx: number) => (
            <FormControlLabel
              key={color.color}
              value={color.label}
              control={<Radio sx={{ zIndex: 2 }} />}
              label={
                <Label color={color.color} label={color.label} idx={idx} />
              }
              sx={{ position: "relative", mx: 0 }}
            />
          ))}
        </RadioGroup>
        {/* {isError && <FormHelperText>{helperText}</FormHelperText>} */}
      </FormControl>
    </>
  );
};

export default CommonSkinType;

const Label = ({
  color,
  label,
  idx,
}: {
  color: string;
  label: string;
  idx: number;
}) => (
  <Box
    sx={{
      backgroundColor: color,
      height: 100,
      width: 40,
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 600,
      color: idx > 4 ? "#fff" : "#000",
    }}
  >
    {label}
  </Box>
);
