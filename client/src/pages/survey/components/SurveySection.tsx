import React, { useCallback, useState } from "react";
import { Box, Typography } from "@mui/material";
import { SURVEY_QUESTIONS } from "../../../constants";
import {
  PersonImage,
  QuestionType,
  SurveyAnswerPayload,
  SurveyAnswers,
} from "../../../services/utilities/types";
import CommonSwitchComponent from "../../../common/CommonSwitchComponent";
import CommonSkinType from "../../../common/CommonSkinType";

interface SurveySectionProps {
  image: PersonImage;
  index: number;
  answers: SurveyAnswers[];
  setAnswers: React.Dispatch<React.SetStateAction<SurveyAnswers[]>>;
  isSurveySubmitted?: boolean;
}

const SurveySection: React.FC<SurveySectionProps> = ({
  image,
  index,
  answers,
  setAnswers,
  isSurveySubmitted,
}) => {
  const handleChange = (
    selectedOption: string,
    field: keyof SurveyAnswerPayload
  ) => {
    const updatedAnswers = [...answers];
    let updatedAnswer = { ...answers[index] };
    updatedAnswer = { ...updatedAnswer, [field]: selectedOption };
    updatedAnswers[index] = updatedAnswer;
    // console.log({ updatedAnswers });

    setAnswers(updatedAnswers);
  };

  const doesItHaveErr = useCallback(
    (val: string | string[] | number): boolean | undefined => {
      if (isSurveySubmitted) {
        if (val === "" || val === undefined) return true;
        return false;
      }
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSurveySubmitted, answers]
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
      name: "race",
    },
  ]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <img
          srcSet={image.photo_url}
          src={image.photo_url}
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
        selectedOption={answers?.[index]?.skin || ""}
        onOptionChange={(selectedOption) =>
          handleChange(selectedOption, "skin")
        }
      />

      {questions.map((question, idx: number) => (
        <CommonSwitchComponent
          question={question.question}
          choices={question.options}
          key={idx}
          selectedOption={answers?.[index]?.[question.name] || ""}
          onOptionChange={(selectedOption) =>
            handleChange(selectedOption, question.name)
          }
          isError={doesItHaveErr(answers?.[index]?.[question.name])}
        />
      ))}

      <Typography
        component="span"
        sx={{
          color: "#000",
          fontWeight: 600,
          fontSize: "1rem",
          marginTop: 1,
        }}
      >
        Please rate the person in the photo on a scale of 1 to 7 on the
        following dimensions:
      </Typography>

      {SURVEY_QUESTIONS.map((question, idx: number) => (
        <CommonSwitchComponent
          question={question.question}
          choices={question.options}
          key={idx}
          selectedOption={answers?.[index]?.[question.name] || ""}
          onOptionChange={(selectedOption) =>
            handleChange(selectedOption, question.name)
          }
          isError={doesItHaveErr(answers?.[index]?.[question.name])}
          horizontal={question.horizontal}
        />
      ))}
    </Box>
  );
};

export default SurveySection;
