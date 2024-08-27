import React from "react";
import { Typography } from "@mui/material";
import { primary } from "../../../theme/themeColors";
interface ExitProps {
  isExitSubmitted: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Exit: React.FC<ExitProps> = () => {
  return (
    <>
      <Typography>
        Please follow the link below in order to capture your participation in
        this study.
      </Typography>
      <Typography
        component={"a"}
        href="https://app.prolific.com/submissions/complete?cc=CQ2CR1H1"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: primary.main, textDecoration: "underline" }}
      >
        https://app.prolific.com/submissions/complete?cc=CQ2CR1H1
      </Typography>
    </>
  );
};

export default Exit;
