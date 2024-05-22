import React, { useState } from "react";
import { Grid } from "@mui/material";
import Steppers from "./components/Steppers";
import Sections from "./components/Sections";
import { useSurveyAnswerContext } from "../../context/SurveyAnswerContext";
import { useNavigate } from "react-router-dom";
import { secondary } from "../../theme/themeColors";
// import { surveyUserService } from "../../services/utilities/provider";
import CommonSnackbar from "../../common/CommonSnackbar";

const Survey = () => {
  const navigate = useNavigate();
  const { surveyAnswers, setSurveyAnswers } = useSurveyAnswerContext();
  const [activeStep, setActiveStep] = useState<number>(0);

  const [isIntroSubmitted, setIsIntroSubmitted] = useState<boolean>(false);
  const [isPractiseSubmitted, setIsPractiseSubmitted] =
    useState<boolean>(false);
  const [isSurveySubmitted, setIsSurveySubmitted] = useState<boolean>(false);
  const [isExitSubmitted, setIsExitSubmitted] = useState<boolean>(false);

  const [openSnack, setIsOpenSnack] = React.useState(false);

  const handleNext = () => {
    if (activeStep === 0) {
      setIsIntroSubmitted(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // if (
      //   surveyAnswers.age &&
      //   surveyAnswers.education &&
      //   surveyAnswers.gender &&
      //   surveyAnswers.race
      // ) {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // } else {
      //   setIsOpenSnack(true);
      // }
    } else if (activeStep === 2) {
      setIsPractiseSubmitted(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // if (surveyAnswers.pLip) {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // } else {
      //   setIsOpenSnack(true);
      // }
    } else if (activeStep === 3) {
      setIsSurveySubmitted(true);
      if (
        surveyAnswers.gender !== "" &&
        surveyAnswers.gender &&
        surveyAnswers.education
      ) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setIsOpenSnack(true);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setIsExitSubmitted(true);
    sendAnswer();

    // if (
    //   !surveyAnswers.isInterested ||
    //   (surveyAnswers.isInterested === "Yes, I would like to participate" &&
    //     (surveyAnswers.email === undefined || surveyAnswers.email === ""))
    // ) {
    //   setIsOpenSnack(true);
    // } else {
    //   sendAnswer();
    // }
  };

  const sendAnswer = async () => {
    // await surveyUserService
    //   .post(surveyAnswers)
    //   .then((res) => {
    //     console.log(res);
    //     navigate("/success");
    //   })
    //   .finally(() => {
    //     setActiveStep(0);
    //   });

    // console.log(surveyAnswers);
    setSurveyAnswers({
      gender: "",
      age: 0,
      education: "",
      race: "",
      pSkin: 0,
      pRace: "",
      pLip: 0,
      pNose: 0,
      pOverall: 0,
      answers: [],
    });
    navigate("/success");
  };

  return (
    <Grid container sx={{ minHeight: "80vh" }}>
      <CommonSnackbar
        open={openSnack}
        handleClose={() => setIsOpenSnack(false)}
      />
      <Grid
        item
        xs={12}
        md={4}
        sx={{ position: "sticky", top: 0, backgroundColor: secondary.main }}
      >
        <Steppers activeStep={activeStep} />
      </Grid>
      <Grid item xs={12} md={8} sx={{ overflowY: "scroll", maxHeight: "80vh" }}>
        <Sections
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleReset={handleReset}
          isIntroSubmitted={isIntroSubmitted}
          isPractiseSubmitted={isPractiseSubmitted}
          isSurveySubmitted={isSurveySubmitted}
          isExitSubmitted={isExitSubmitted}
        />
      </Grid>
    </Grid>
  );
};

export default Survey;
