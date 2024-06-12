import React from "react";
import { Typography } from "@mui/material";
// import CommonSwitchComponent from "../../../common/CommonSwitchComponent";
// import { useSurveyAnswerContext } from "../../../context/SurveyAnswerContext";

interface ExitProps {
  isExitSubmitted: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Exit: React.FC<ExitProps> = ({ isExitSubmitted }) => {
  // const { surveyAnswers, setSurveyAnswers } = useSurveyAnswerContext();

  // const handleExitChange = (selectedOption: string, field: string) => {
  //   const updatedExitAnswers = { ...surveyAnswers };
  //   updatedExitAnswers[field] = selectedOption;
  //   setSurveyAnswers(updatedExitAnswers);
  // };

  // const doesItHaveErr = useCallback(
  //   (val: string): boolean | undefined => {
  //     if (isExitSubmitted) {
  //       if (val === "" || val === undefined) return true;
  //       return false;
  //     }
  //     return false;
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [isExitSubmitted]
  // );

  return (
    <>
      <Typography>
        Thank you for your input! Please follow the link below in order to
        capture your participation in this study.
      </Typography>
      {/* <Typography>
        https://app.prolific.com/submissions/complete?cc=CQ2CR1H1
      </Typography> */}
      {/* <CommonSwitchComponent
        question=""
        choices={[
          "Yes, I would like to participate",
          "No, I do not want to participate",
        ]}
        selectedOption={surveyAnswers?.isInterested || ""}
        onOptionChange={(selectedOption) =>
          handleExitChange(selectedOption, "isInterested")
        }
        isError={doesItHaveErr(surveyAnswers?.isInterested)}
      />

      {surveyAnswers?.isInterested === "Yes, I would like to participate" && (
        <>
          <Typography sx={{ fontWeight: 500 }}>
            If Yes, Please enter your email
          </Typography>
          <TextField
            label="Enter your email"
            value={surveyAnswers?.email || ""}
            onChange={(e) => handleExitChange(e.target.value, "email")}
            error={doesItHaveErr(surveyAnswers?.email)}
          />
        </>
      )} */}
    </>
  );
};

export default Exit;
