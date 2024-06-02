import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { SurveyAnswers } from "../../../services/utilities/types";
import { useSurveyAnswerContext } from "../../../context/SurveyAnswerContext";
import CommonSnackbar from "../../../common/CommonSnackbar";
import SurveySection from "./SurveySection";
import { Button, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Img1 from "../../../assets/people/c.png";
import Img2 from "../../../assets/people/3.png";
import Img3 from "../../../assets/people/a.png";
import Img4 from "../../../assets/people/1.png";

interface PracticeComponentProps {
  isPractiseSubmitted: boolean;
  handleSectionNext: () => void;
  handleSectionBack: () => void;
}

const Practice: React.FC<PracticeComponentProps> = ({
  isPractiseSubmitted,
  handleSectionNext,
  handleSectionBack,
}) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openSnack, setIsOpenSnack] = useState<boolean>(false);
  const [images] = useState<string[]>([Img1, Img2, Img3, Img4]);
  const [answers, setAnswers] = useState<SurveyAnswers[]>([
    {
      skin: "",
      race: "",
      lip: 0,
      nose: 0,
      overall: 0,
    },
  ]);
  const { surveyAnswers, setSurveyAnswers } = useSurveyAnswerContext();
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = (idx: number) => {
    if (
      answers?.[idx]?.skin !== "" &&
      answers?.[idx]?.race !== "" &&
      answers?.[idx]?.lip &&
      answers?.[idx]?.nose &&
      answers?.[idx]?.overall
    ) {
      if (activeStep === images.length - 1) {
        const updatedSurveyAnswers = { ...surveyAnswers };
        updatedSurveyAnswers.pratise = answers;
        setSurveyAnswers(updatedSurveyAnswers);
        handleSectionNext();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      setIsOpenSnack(false);
      setIsSubmitted(false);
    } else {
      setIsOpenSnack(true);
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (isPractiseSubmitted) {
      const updatedSurveyAnswers = { ...surveyAnswers };
      updatedSurveyAnswers.pratise = answers;
      setSurveyAnswers(updatedSurveyAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPractiseSubmitted]);

  return (
    <Box sx={{ width: "100%" }}>
      <CommonSnackbar
        open={openSnack}
        handleClose={() => setIsOpenSnack(false)}
      />

      <SurveySection
        image={images[activeStep]}
        index={activeStep}
        answers={answers}
        setAnswers={setAnswers}
        isSurveySubmitted={isSubmitted}
      />
      <Divider sx={{ mt: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={activeStep === 0 ? handleSectionBack : handleBack}
          sx={{ mt: 1, mr: 1 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => handleNext(activeStep)}
          sx={{ mt: 1, mr: 1 }}
        >
          {activeStep === images.length - 1 ? "Submit" : "Continue"}
          <ArrowForwardIcon sx={{ ml: 2, fontSize: "1rem" }} />
        </Button>
      </Box>
    </Box>
  );
};

export default Practice;
