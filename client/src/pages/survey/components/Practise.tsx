import React, { useCallback, useState } from "react";
import CommonSwitchComponent from "../../../common/CommonSwitchComponent";
import { useSurveyAnswerContext } from "../../../context/SurveyAnswerContext";
import { Box, Typography } from "@mui/material";
import { QuestionType } from "../../../services/utilities/types";
import CommonSkinType from "../../../common/CommonSkinType";

interface PractiseProps {
  isPractiseSubmitted: boolean;
}

const Practise: React.FC<PractiseProps> = ({ isPractiseSubmitted }) => {
  const { surveyAnswers, setSurveyAnswers } = useSurveyAnswerContext();

  const handleChange = (selectedOption: string, name: string | undefined) => {
    if (name) setSurveyAnswers({ ...surveyAnswers, [name]: selectedOption });
  };

  const doesItHaveErr = useCallback(
    (val: string | number | undefined): boolean | undefined => {
      if (isPractiseSubmitted) {
        if (val === "" || val === undefined) return true;
        return false;
      }
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPractiseSubmitted, surveyAnswers]
  );

  const [questions] = useState<QuestionType[]>([
    {
      question: "What race/ethnicity category would you place this person in",
      options: [
        "White/Caucasian",
        "Black/African American",
        "Hispanic/Latin@",
        "Asian/Pacific Islander",
        "Indigenous/Native American/American Indian",
      ],
      type: "MCQ",
      name: "pRace",
    },
  ]);

  const [practiseQuestions] = useState([
    {
      question: "Lip Fullness",
      options: ["1", "2", "3", "4", "5", "6", "7"],
      type: "MCQ",
      horizontal: true,
      name: "pLip",
    },
    {
      question: "Nose Shape",
      options: ["1", "2", "3", "4", "5", "6", "7"],
      type: "MCQ",
      horizontal: true,
      name: "pNose",
    },
    {
      question:
        "Provide an overall assessment if the person in the picture above exhibits as more Afrocentric or Eurocentric",
      options: ["1 - Afrocentric", "2", "3", "4", "5", "6", "7 - Eurocentric"],
      type: "MCQ",
      horizontal: true,
      name: "pOverall",
    },
  ]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <img
          srcSet={
            "https://a.espncdn.com/i/headshots/college-football/players/full/4714009.png"
          }
          src={
            "https://a.espncdn.com/i/headshots/college-football/players/full/4714009.png"
          }
          alt={"image"}
          loading="lazy"
          style={{
            width: 300,
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </Box>
      <CommonSkinType
        question="Please select the shade that best matches the skin tone of the person in the picture above."
        selectedOption={surveyAnswers?.pSkin || ""}
        onOptionChange={(selectedOption) =>
          handleChange(selectedOption, "pSkin")
        }
      />

      {questions.map((question, index: number) => (
        <CommonSwitchComponent
          question={question.question}
          choices={question.options}
          key={index}
          selectedOption={surveyAnswers?.[question.name] || ""}
          onOptionChange={(selectedOption) =>
            handleChange(selectedOption, question.name)
          }
          isError={doesItHaveErr(surveyAnswers?.[question.name])}
        />
      ))}

      <Typography
        component="span"
        sx={{ color: "#000", fontWeight: 600, fontSize: "1.15rem" }}
      >
        Please rate the person in the photo on a scale of 1 to 7 on the
        following dimensions:
      </Typography>
      {practiseQuestions.map((question, index: number) => (
        <CommonSwitchComponent
          question={question.question}
          choices={question.options}
          key={index}
          selectedOption={surveyAnswers?.[question.name] || ""}
          onOptionChange={(selectedOption) =>
            handleChange(selectedOption, question.name)
          }
          isError={doesItHaveErr(surveyAnswers?.[question.name])}
          horizontal={question.horizontal}
        />
      ))}
    </>
  );
};

export default Practise;
