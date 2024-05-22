import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useMediaQuery } from "@mui/material";

interface SteppersProps {
  activeStep: number;
}

const Steppers: React.FC<SteppersProps> = ({ activeStep }) => {
  const steps = [
    {
      label: "Background Information",
    },
    {
      label: "Instructions",
    },
    {
      label: "Practise",
    },
    {
      label: "Survey",
    },
    {
      label: "Exit Survey",
    },
  ];

  const matches = useMediaQuery("(min-width:900px)");

  return (
    <>
      <Box sx={{ py: 3, overflowX: "auto", width: "100%" }}>
        <Stepper
          activeStep={activeStep}
          orientation={matches ? "vertical" : "horizontal"}
        >
          {steps.map((step) => (
            <Step key={step.label} sx={{ fontWeight: 600 }}>
              <StepLabel sx={{ textTransform: "uppercase", fontWeight: 600 }}>
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

export default Steppers;
