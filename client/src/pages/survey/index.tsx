import React, { useState } from "react";
import { Grid } from "@mui/material";
import Steppers from "./components/Steppers";
import Sections from "./components/Sections";
import { useSurveyAnswerContext } from "../../context/SurveyAnswerContext";
import { useNavigate } from "react-router-dom";
import { secondary } from "../../theme/themeColors";
import CommonSnackbar from "../../common/CommonSnackbar";
import { surveyEditService } from "../../services/utilities/provider";
import {
  Evaluation,
  SurveyAnswerPayload,
} from "../../services/utilities/types";

const Survey = () => {
  const navigate = useNavigate();

  const { surveyAnswers, setSurveyAnswers } = useSurveyAnswerContext();
  const [consentAnswer, setConsentAnswer] = useState("");

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isConsentSubmitted, setIsConsentSubmitted] = useState<boolean>(false);
  const [isIntroSubmitted, setIsIntroSubmitted] = useState<boolean>(false);
  const [isPractiseSubmitted, setIsPractiseSubmitted] =
    useState<boolean>(false);
  const [isSurveySubmitted, setIsSurveySubmitted] = useState<boolean>(false);
  const [isExitSubmitted, setIsExitSubmitted] = useState<boolean>(false);
  const [openSnack, setIsOpenSnack] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // New state variable

  const handleNext = () => {
    if (activeStep === 0) {
      setIsConsentSubmitted(true);
      if (consentAnswer !== "") {
        if (consentAnswer === "I do not consent to participate") {
          setIsOpenSnack(true);
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        setIsOpenSnack(true);
      }
    } else if (activeStep === 1) {
      setIsIntroSubmitted(true);
      if (
        surveyAnswers.prolificId &&
        surveyAnswers.age &&
        surveyAnswers.education &&
        surveyAnswers.gender &&
        surveyAnswers.race &&
        surveyAnswers.skin
      ) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setIsOpenSnack(true);
      }
    } else if (activeStep === 4) {
      setIsOpenSnack(false);
      setIsPractiseSubmitted(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      // if (surveyAnswers.pratise.length !== 0) {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // } else {
      //   setIsOpenSnack(true);
      // }
    } else if (activeStep === 5) {
      setIsOpenSnack(false);
      setIsSurveySubmitted(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // if (surveyAnswers.answers.length !== 0) {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // } else {
      //   setIsOpenSnack(true);
      // }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    if (!isSubmitting) {
      setIsExitSubmitted(true);
      sendAnswer();
    }

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
    if (isSubmitting) return;
    setIsSubmitting(true);
    // surveyAnswers.answers.map(async (answer: RaceAnswer) => {
    let evaluations: Evaluation[] = [];
    surveyAnswers.answers.map((answer) => {
      evaluations = [
        ...evaluations,
        {
          id: answer.id,
          st: answer.skin,
          race: answer.race,
          featuresa: answer.lip,
          featuresb: answer.nose,
          featuresc: answer.overall,
        },
      ];
    });

    const body: SurveyAnswerPayload = {
      name: surveyAnswers.name,
      gender: surveyAnswers.gender,
      age: surveyAnswers.age,
      edu: surveyAnswers.education,
      u_race: surveyAnswers.race,
      skin: surveyAnswers.skin,
      evaluations: evaluations,
      practise: surveyAnswers.pratise,
    };
    console.log(body);
    await surveyEditService
      .post(body)
      .then((res) => {
        console.log(res);
        navigate("/success");
      })
      .finally(() => {
        setActiveStep(0);
      });

    setSurveyAnswers({
      name: "",
      gender: "",
      age: 0,
      skin: "",
      education: "",
      race: "",
      pratise: [],
      answers: [],
      email: "",
      isInterested: "",
      prolificId: "",
    });
    navigate("/success");
  };

  return (
    <Grid container sx={{ minHeight: "80vh" }}>
      <CommonSnackbar
        open={openSnack}
        handleClose={() => setIsOpenSnack(false)}
        helperText={
          consentAnswer === "I do not consent to participate"
            ? "Please accept consent to proceed"
            : "Please fill in all the fields !"
        }
      />
      <Grid
        item
        xs={12}
        md={12}
        sx={{ position: "sticky", top: 0, backgroundColor: secondary.main }}
      >
        <Steppers activeStep={activeStep} />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <Sections
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleReset={handleReset}
          isConsentSubmitted={isConsentSubmitted}
          isIntroSubmitted={isIntroSubmitted}
          isPractiseSubmitted={isPractiseSubmitted}
          isSurveySubmitted={isSurveySubmitted}
          isExitSubmitted={isExitSubmitted}
          consentAnswer={consentAnswer}
          setConsentAnswer={setConsentAnswer}
        />
      </Grid>
    </Grid>
  );
};

export default Survey;
