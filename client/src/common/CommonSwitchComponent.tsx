import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { error } from "../theme/themeColors";
import { LBLKeys, SurveyAnswers } from "../services/utilities/types";
import { LBL_VAL_MAP } from "../constants";

interface CommonSwitchComponentProps {
  question: string;
  choices: string[];
  selectedOption?: string | number | SurveyAnswers[];
  onOptionChange?: (selectedOption: string) => void;
  additionalTextField?: boolean;
  helperText?: string | SurveyAnswers[];
  isError?: boolean;
  horizontal?: boolean;
  mapping?: boolean;
}

const CommonSwitchComponent: React.FC<CommonSwitchComponentProps> = ({
  question,
  choices,
  selectedOption,
  onOptionChange,
  additionalTextField = false,
  helperText = "Select one option at least",
  isError = false,
  horizontal = false,
  mapping = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onOptionChange)
      onOptionChange((event.target as HTMLInputElement).value);
  };

  const getLblValue = (key: LBLKeys): number => {
    return LBL_VAL_MAP[key];
  };

  return (
    <>
      <FormControl error={isError}>
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
          value={typeof selectedOption === "string" ? selectedOption : ""}
          onChange={handleChange}
          sx={{ flexDirection: horizontal ? "row" : "column", fontWeight: 500 }}
        >
          {choices.map((choice) => (
            <FormControlLabel
              key={choice}
              value={mapping ? getLblValue(choice) : choice}
              control={<Radio />}
              label={choice}
            />
          ))}
        </RadioGroup>
        {isError && typeof helperText === "string" && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
        {additionalTextField && (
          <>
            <Typography sx={{ fontStyle: "italic", mb: 0.5 }}>
              Not listed, please tell us
            </Typography>
            <TextField
              value={selectedOption}
              onChange={handleChange}
              size="small"
            />
          </>
        )}
      </FormControl>
    </>
  );
};

export default CommonSwitchComponent;
