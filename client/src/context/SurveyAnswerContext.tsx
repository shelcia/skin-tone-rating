import React, { createContext, useContext, useState, ReactNode } from "react";
import { SurveyAnswerResponse } from "../services/utilities/types";

interface SurveyAnswerContextProps {
  surveyAnswers: SurveyAnswerResponse;
  setSurveyAnswers: React.Dispatch<React.SetStateAction<SurveyAnswerResponse>>;
  isSurveyError: boolean;
  setIsSurveyError: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyAnswerContext = createContext<SurveyAnswerContextProps | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useSurveyAnswerContext = (): SurveyAnswerContextProps => {
  const context = useContext(SurveyAnswerContext);
  if (!context) {
    throw new Error(
      "useSurveyAnswerContext must be used within a SurveyAnswerProvider"
    );
  }
  return context;
};

interface SurveyAnswerProviderProps {
  children: ReactNode;
}

export const SurveyAnswerProvider: React.FC<SurveyAnswerProviderProps> = ({
  children,
}) => {
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswerResponse>({
    gender: "",
    age: 0,
    education: "",
    skin: "",
    race: "",
    pratise: [],
    answers: [],
    email: "",
    isInterested: "",
  });

  const [isSurveyError, setIsSurveyError] = useState<boolean>(false);

  const value: SurveyAnswerContextProps = {
    surveyAnswers,
    setSurveyAnswers,
    isSurveyError,
    setIsSurveyError,
  };

  return (
    <SurveyAnswerContext.Provider value={value}>
      {children}
    </SurveyAnswerContext.Provider>
  );
};
