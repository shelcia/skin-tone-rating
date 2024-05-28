import React, { useState } from "react";
import CommonSwitchComponent from "../../../common/CommonSwitchComponent";
import { FormControl, Skeleton, TextField, Typography } from "@mui/material";
import { useSurveyAnswerContext } from "../../../context/SurveyAnswerContext";
import { error } from "../../../theme/themeColors";
import {
  QuestionType,
  SurveyAnswerPayload,
  SurveyAnswers,
} from "../../../services/utilities/types";

interface IntroductionProps {
  isIntroSubmitted: boolean;
}

const Introduction: React.FC<IntroductionProps> = ({ isIntroSubmitted }) => {
  const [questions] = useState<QuestionType[]>([
    {
      question: "What is your gender?",
      options: ["Man", "Women", "Other"],
      type: "MCQ",
      name: "gender",
    },
    {
      question: "What is your age?",
      options: [],
      type: "TEXT",
      name: "age",
    },
    {
      question:
        "Which of the following best describes the highest level of education you have completed? (Carnegie Melon borrowed)",
      options: [
        "Some high school",
        "High school diploma/GED (General Education Diploma)",
        "Some college, but no degree",
        "Associate degree (e.g., AA, AS)",
        "Bachelor's degree (e.g., BA, BS)",
        "Master's degree (e.g., MA, MS, MBA)",
        "Doctoral degree (e.g., PhD, EdD, MD, JD)",
      ],
      type: "MCQ",
      name: "education",
    },
    {
      question: "What is your race",
      options: [
        "White/Caucasian",
        "Black/African American",
        "Hispanic/Latin@",
        "Asian/Pacific Islander",
        "Indigenous/Native American/American Indian",
        "Other",
      ],
      type: "MCQ",
      name: "race",
    },
  ]);

  const { surveyAnswers, setSurveyAnswers } = useSurveyAnswerContext();

  const [isLoading] = useState(false);

  const handleQuestionChange = (
    selectedOption: string,
    name: keyof SurveyAnswerPayload
  ) => {
    setSurveyAnswers({ ...surveyAnswers, [name]: selectedOption });
  };

  const doesItHaveErr = (
    val: string | number | undefined | SurveyAnswers[]
  ): boolean | undefined => {
    if (isIntroSubmitted) {
      if (val === "" || val === undefined || val === 0) return true;
      return false;
    }
    return false;
  };

  return isLoading ? (
    <>
      <Skeleton variant="rounded" width={"100%"} height={60} animation="wave" />
      <Skeleton variant="rounded" width={"100%"} height={60} animation="wave" />
      <Skeleton variant="rounded" width={"100%"} height={60} animation="wave" />
    </>
  ) : (
    <>
      {questions.map((question, index) =>
        question.type === "MCQ" ? (
          <CommonSwitchComponent
            question={question.question}
            selectedOption={surveyAnswers?.[question.name] || ""}
            choices={question.options}
            key={index}
            onOptionChange={(selectedOption) =>
              handleQuestionChange(selectedOption, question.name)
            }
            isError={doesItHaveErr(surveyAnswers?.[question.name])}
          />
        ) : (
          <FormControl fullWidth key={index}>
            <Typography
              sx={{
                color: doesItHaveErr(surveyAnswers?.[question.name])
                  ? error.main
                  : "#000",
              }}
            >
              {question.question}
            </Typography>
            <TextField
              type="number"
              size="small"
              value={surveyAnswers?.[question.name]}
              onChange={(e) =>
                handleQuestionChange(e.target.value, question.name)
              }
              error={doesItHaveErr(surveyAnswers?.[question.name])}
            />
          </FormControl>
        )
      )}
    </>
  );
};

export default Introduction;
