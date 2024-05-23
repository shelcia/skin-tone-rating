import React, { ReactElement } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Practise from "./Practise";
import Exit from "./Exit";
import Introduction from "./Introduction";
import Instructions from "./Instructions";
import Survey from "./Survey";

interface SectionsProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  isIntroSubmitted: boolean;
  isPractiseSubmitted: boolean;
  isSurveySubmitted: boolean;
  isExitSubmitted: boolean;
}

const Sections: React.FC<SectionsProps> = ({
  activeStep,
  handleNext,
  handleBack,
  handleReset,
  isIntroSubmitted,
  isPractiseSubmitted,
  isSurveySubmitted,
  isExitSubmitted,
}) => {
  return (
    <>
      {activeStep === 0 && (
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
      {activeStep === 1 && (
        <SectionWrapper
          activeStep={activeStep}
          topic="Instructions"
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
      {activeStep === 2 && (
        <SectionWrapper
          activeStep={activeStep}
          topic="Practise"
          handleNext={handleNext}
          handleBack={handleBack}
        >
          <Box sx={{ display: "flex", gap: 4, flexDirection: "column", mb: 4 }}>
            <Practise isPractiseSubmitted={isPractiseSubmitted} />
          </Box>
        </SectionWrapper>
      )}
      {activeStep === 3 && (
        <SectionWrapper
          activeStep={activeStep}
          topic="Survey"
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
      {activeStep === 4 && (
        <SectionWrapper
          activeStep={activeStep}
          topic="Exit Questionairre"
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
      {activeStep !== 3 && (
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
            {activeStep === 4 ? "Submit" : "Continue"}
            <ArrowForwardIcon sx={{ ml: 2, fontSize: "1rem" }} />
          </Button>
        </Box>
      )}
    </Paper>
  );
};
