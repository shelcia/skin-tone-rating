// import React, { useCallback, useState } from "react";
// import CommonSwitchComponent from "../../../common/CommonSwitchComponent";
// import { useSurveyAnswerContext } from "../../../context/SurveyAnswerContext";
// import { Box, Grid, Typography } from "@mui/material";
// import {
//   QuestionType,
//   SurveyAnswerPayload,
//   SurveyAnswers,
// } from "../../../services/utilities/types";
// import CommonSkinType from "../../../common/CommonSkinType";
// import { PSURVEY_QUESTIONS } from "../../../constants";
// import Zoom from "react-medium-image-zoom";

// interface PractiseProps {
//   isPractiseSubmitted: boolean;
// }

// const Practise: React.FC<PractiseProps> = ({ isPractiseSubmitted }) => {
//   const { surveyAnswers, setSurveyAnswers } = useSurveyAnswerContext();

//   const handleChange = (
//     selectedOption: string,
//     name: keyof SurveyAnswerPayload
//   ) => {
//     if (name) setSurveyAnswers({ ...surveyAnswers, [name]: selectedOption });
//   };

//   const doesItHaveErr = useCallback(
//     (
//       val: string | number | undefined | SurveyAnswers[]
//     ): boolean | undefined => {
//       if (isPractiseSubmitted) {
//         if (val === "" || val === undefined) return true;
//         return false;
//       }
//       return false;
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [isPractiseSubmitted, surveyAnswers]
//   );

//   const [questions] = useState<QuestionType[]>([
//     {
//       question: "What race/ethnicity category would you place this person in",
//       options: [
//         "White/Caucasian",
//         "Black/African American",
//         "Hispanic/Latin@",
//         "Asian/Pacific Islander",
//         "Indigenous/Native American/American Indian",
//       ],
//       type: "MCQ",
//       name: "pRace",
//     },
//   ]);

//   const [practiseQuestions] = useState(PSURVEY_QUESTIONS);

//   return (
//     <>
//       <Grid container>
//         <Grid item md={4} xs={12}>
//           <Box sx={{ width: "100%" }}>
//             <Zoom>
//               <img
//                 srcSet={
//                   "https://a.espncdn.com/i/headshots/college-football/players/full/4714009.png"
//                 }
//                 src={
//                   "https://a.espncdn.com/i/headshots/college-football/players/full/4714009.png"
//                 }
//                 alt={"image"}
//                 loading="lazy"
//                 style={{
//                   width: 300,
//                   height: "auto",
//                   marginLeft: "auto",
//                   marginRight: "auto",
//                 }}
//               />
//             </Zoom>
//           </Box>
//         </Grid>
//         <Grid item md={8} xs={12}>
//           <>
//             <CommonSkinType
//               question="Please select the shade that best matches the skin tone of the person in the picture above."
//               selectedOption={surveyAnswers?.pSkin || ""}
//               onOptionChange={(selectedOption) =>
//                 handleChange(selectedOption, "pSkin")
//               }
//             />

//             {questions.map((question, index: number) => (
//               <CommonSwitchComponent
//                 question={question.question}
//                 choices={question.options}
//                 key={index}
//                 selectedOption={surveyAnswers?.[question.name] || ""}
//                 onOptionChange={(selectedOption) =>
//                   handleChange(selectedOption, question.name)
//                 }
//                 isError={doesItHaveErr(surveyAnswers?.[question.name])}
//                 horizontal={true}
//               />
//             ))}

//             <Typography
//               component="div"
//               sx={{
//                 color: "#000",
//                 fontWeight: 600,
//                 fontSize: "1.15rem",
//                 my: 2,
//               }}
//             >
//               Please rate the person in the photo on a scale of 1 to 7 on the
//               following dimensions:
//             </Typography>
//             {practiseQuestions.map((question, index: number) => (
//               <CommonSwitchComponent
//                 question={question.question}
//                 choices={question.options}
//                 key={index}
//                 selectedOption={surveyAnswers?.[question.name] || ""}
//                 onOptionChange={(selectedOption) =>
//                   handleChange(selectedOption, question.name)
//                 }
//                 isError={doesItHaveErr(surveyAnswers?.[question.name])}
//                 horizontal={question.horizontal}
//               />
//             ))}
//           </>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default Practise;

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
  const [openSnack, setIsOpenSnack] = useState<boolean>(false);
  const [images] = useState<string[]>([Img1, Img2, Img3, Img4]);
  const [answers, setAnswers] = useState<SurveyAnswers[]>([
    {
      skin: 0,
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
        isSurveySubmitted={isPractiseSubmitted}
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
          onClick={
            activeStep === images.length - 1 ? handleSectionNext : handleNext
          }
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
