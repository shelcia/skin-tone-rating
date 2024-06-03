import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { PersonImage, SurveyAnswers } from "../../../services/utilities/types";
import { useSurveyAnswerContext } from "../../../context/SurveyAnswerContext";
import CommonSnackbar from "../../../common/CommonSnackbar";
import SurveySection from "./SurveySection";
import { imageService } from "../../../services/utilities/provider";
import { Button, Divider, Skeleton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface SurveyComponentProps {
  isSurveySubmitted: boolean;
  handleSectionNext: () => void;
  handleSectionBack: () => void;
}

const SurveyComponent: React.FC<SurveyComponentProps> = ({
  isSurveySubmitted,
  handleSectionNext,
  handleSectionBack,
}) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openSnack, setIsOpenSnack] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [images, setImages] = useState<PersonImage[]>([]);
  const [answers, setAnswers] = useState<SurveyAnswers[]>([
    {
      id: "",
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
    answers[idx].id = images[idx].id;
    if (
      answers?.[idx]?.skin &&
      answers?.[idx]?.race !== "" &&
      answers?.[idx]?.lip &&
      answers?.[idx]?.nose &&
      answers?.[idx]?.overall
    ) {
      if (activeStep === images.length - 1) {
        const updatedSurveyAnswers = { ...surveyAnswers };
        updatedSurveyAnswers.answers = answers;
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

  const fetchImages = async () => {
    imageService
      .getAll()
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setImages(res.data.splice(0, 3));
          // setImages(res.data);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (isSurveySubmitted) {
      const updatedSurveyAnswers = { ...surveyAnswers };
      updatedSurveyAnswers.answers = answers;
      setSurveyAnswers(updatedSurveyAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSurveySubmitted]);

  return isLoading ? (
    <>
      <Skeleton variant="rounded" width={"100%"} height={60} animation="wave" />
      <Skeleton variant="rounded" width={"100%"} height={60} animation="wave" />
      <Skeleton variant="rounded" width={"100%"} height={60} animation="wave" />
    </>
  ) : (
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

export default SurveyComponent;
