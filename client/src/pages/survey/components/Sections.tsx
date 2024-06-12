import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Practise from "./Practise";
import Exit from "./Exit";
import Introduction from "./Introduction";
import Instructions from "./Instructions";
import Survey from "./Survey";
import Details from "./Details";
import Consent from "./Consent";

interface SectionsProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  isConsentSubmitted: boolean;
  isIntroSubmitted: boolean;
  isPractiseSubmitted: boolean;
  isSurveySubmitted: boolean;
  isExitSubmitted: boolean;
  consentAnswer: string;
  setConsentAnswer: Dispatch<SetStateAction<string>>;
}

const Sections: React.FC<SectionsProps> = ({
  activeStep,
  handleNext,
  handleBack,
  handleReset,
  isConsentSubmitted,
  isIntroSubmitted,
  isPractiseSubmitted,
  isSurveySubmitted,
  isExitSubmitted,
  consentAnswer,
  setConsentAnswer,
}) => {
  return (
    <>
      {activeStep === 0 && (
        <SectionWrapper
          activeStep={activeStep}
          topic=""
          handleNext={handleNext}
          handleBack={handleBack}
        >
          <Box sx={{ display: "flex", gap: 4, flexDirection: "column", mb: 4 }}>
            <Consent
              isConsentSubmitted={isConsentSubmitted}
              consentAnswer={consentAnswer}
              setConsentAnswer={setConsentAnswer}
            />
          </Box>
        </SectionWrapper>
      )}
      {activeStep === 1 && (
        <SectionWrapper
          activeStep={activeStep}
          topic="Background Information"
          handleNext={handleNext}
          handleBack={handleBack}
        >
          <Box sx={{ display: "flex", gap: 4, flexDirection: "column", mb: 4 }}>
            <Introduction isIntroSubmitted={isIntroSubmitted} />
          </Box>
        </SectionWrapper>
      )}
      {activeStep === 2 && (
        <SectionWrapper
          activeStep={activeStep}
          topic="Instructions - Part I"
          handleNext={handleNext}
          handleBack={handleBack}
        >
          <>
            <Box
              sx={{ display: "flex", gap: 4, flexDirection: "column", mb: 4 }}
            >
              <Instructions />
            </Box>
          </>
        </SectionWrapper>
      )}
      {activeStep === 3 && (
        <SectionWrapper
          activeStep={activeStep}
          topic="Instructions - Part II"
          handleNext={handleNext}
          handleBack={handleBack}
        >
          <Box sx={{ display: "flex", gap: 4, flexDirection: "column", mb: 4 }}>
            <Details />
          </Box>
        </SectionWrapper>
      )}
      {activeStep === 4 && (
        <SectionWrapper
          activeStep={activeStep}
          topic=""
          handleNext={handleNext}
          handleBack={handleBack}
        >
          <Box sx={{ display: "flex", gap: 4, flexDirection: "column", mb: 4 }}>
            <Practise
              isPractiseSubmitted={isPractiseSubmitted}
              handleSectionNext={handleNext}
              handleSectionBack={handleBack}
            />
          </Box>
        </SectionWrapper>
      )}
      {activeStep === 5 && (
        <SectionWrapper
          activeStep={activeStep}
          topic=""
          handleNext={handleNext}
          handleBack={handleBack}
        >
          <>
            <Box
              sx={{ display: "flex", gap: 4, flexDirection: "column", mb: 4 }}
            >
              <Survey
                isSurveySubmitted={isSurveySubmitted}
                handleSectionNext={handleNext}
                handleSectionBack={handleBack}
              />
            </Box>
          </>
        </SectionWrapper>
      )}
      {activeStep === 6 && (
        <SectionWrapper
          activeStep={activeStep}
          topic="Exit Survey"
          handleNext={handleReset}
          handleBack={handleBack}
        >
          <>
            <Box
              sx={{ display: "flex", gap: 4, flexDirection: "column", mb: 4 }}
            >
              <Exit isExitSubmitted={isExitSubmitted} />
            </Box>
          </>
        </SectionWrapper>
      )}
    </>
  );
};

export default Sections;

interface SectionWrapperProps {
  activeStep: number;
  topic: string;
  handleNext: () => void;
  handleBack: () => void;
  activeContextStep?: number;
  children: ReactElement;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  activeStep,
  topic,
  handleNext,
  handleBack,
  children,
}) => {
  return (
    <Paper square elevation={0} sx={{ p: 3 }}>
      {topic !== "" && (
        <Typography
          component={"h4"}
          variant="h4"
          sx={{ mb: 4, fontWeight: 700 }}
        >
          {topic}
        </Typography>
      )}
      <Box>{children}</Box>
      {activeStep !== 4 && activeStep !== 5 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 1, mr: 1 }}
          >
            {activeStep === 5 ? "Submit" : "Continue"}
            <ArrowForwardIcon sx={{ ml: 2, fontSize: "1rem" }} />
          </Button>
        </Box>
      )}
    </Paper>
  );
};
