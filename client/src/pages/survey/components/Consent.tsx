import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Alert, Box, Typography } from "@mui/material";
import CommonSwitchComponent from "../../../common/CommonSwitchComponent";
import { warning } from "../../../theme/themeColors";

interface ConsentProps {
  isConsentSubmitted: boolean;
  consentAnswer: string;
  setConsentAnswer: Dispatch<SetStateAction<string>>;
}

const Consent: React.FC<ConsentProps> = ({
  isConsentSubmitted,
  consentAnswer,
  setConsentAnswer,
}) => {
  const handleExitChange = (selectedOption: string) => {
    setConsentAnswer(selectedOption);
  };

  const doesItHaveErr = useCallback(
    (val: string): boolean | undefined => {
      if (isConsentSubmitted) {
        if (val === "" || val === undefined) return true;
        return false;
      }
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isConsentSubmitted]
  );

  return (
    <Box>
      <Alert
        severity="warning"
        variant="filled"
        sx={{ backgroundColor: warning.dark, mb: 4 }}
      >
        Please read the instructions carefully.
      </Alert>
      <Typography>
        You are invited to participate in a research study conducted by a
        research team at the University of Wisconsin-Madison. The purpose of
        this study is to investigate one's perceptions of skin tone by having
        participants rate individuals' photos.
        <br /> <br />
        Your participation is entirely voluntary. If you agree to participate in
        our study, you will be asked to complete the ratings, which will take
        approximately 30-45 minutes. There will also be a few demographic
        questions to answer as well. There is minimal risk involved in this
        study. Participants may become fatigued due to the length of the study.
        Your responses are anonymous, and no identifying information will be
        collected as part of the study.
        <br /> <br />
        You may ask any questions about the research study at any time. If you
        have questions, concerns, or complaints, contact the Principal
        Investigator, Jirs Meuris, at (608) 265-3820 or meuris@wisc.edu. If you
        have any concerns about your rights as a research participant or have
        complaints about the research study or study team, call the confidential
        research compliance line at 1-833-652-2506. Staff will work with you to
        address concerns about research participation and assist in resolving
        problems.
        <br /> <br />
        You can keep a copy of this form for your records if desired.
      </Typography>
      <Typography sx={{ marginTop: 2 }}>
        By clicking{" "}
        <span style={{ fontWeight: 600 }}>"I consent to participate,"</span> you
        are indicating your consent.
      </Typography>

      <CommonSwitchComponent
        question=""
        choices={[
          "I consent to participate",
          "I do not consent to participate",
        ]}
        selectedOption={consentAnswer || ""}
        onOptionChange={(selectedOption) => handleExitChange(selectedOption)}
        isError={doesItHaveErr(consentAnswer)}
      />
    </Box>
  );
};

export default Consent;
