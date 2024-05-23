import { QuestionType } from "../services/utilities/types";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const PREFIX: string = "FOOTBALL";

export const PSURVEY_QUESTIONS: QuestionType[] = [
  {
    question: "Lip Fullness",
    options: ["1 - very thin", "2", "3", "4", "5", "6", "7 - very full"],
    type: "MCQ",
    horizontal: true,
    name: "pLip",
  },
  {
    question: "Nose Shape",
    options: [
      "1 - very thin/narrow",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7 - very flat/broad",
    ],
    type: "MCQ",
    horizontal: true,
    name: "pNose",
  },
  {
    question:
      "Provide an overall assessment if the person in the picture above exhibits as more Afrocentric or Eurocentric",
    options: ["1 - Afrocentric", "2", "3", "4", "5", "6", "7 - Eurocentric"],
    type: "MCQ",
    horizontal: true,
    name: "pOverall",
  },
];

export const SURVEY_QUESTIONS: QuestionType[] = [
  {
    question: "Lip Fullness",
    options: ["1 - very thin", "2", "3", "4", "5", "6", "7 - very full"],
    type: "MCQ",
    horizontal: true,
    name: "lip",
  },
  {
    question: "Nose Shape",
    options: [
      "1 - very thin/narrow",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7 - very flat/broad",
    ],
    type: "MCQ",
    horizontal: true,
    name: "nose",
  },
  {
    question:
      "Provide an overall assessment if the person in the picture above exhibits as more Afrocentric or Eurocentric",
    options: ["1 - Afrocentric", "2", "3", "4", "5", "6", "7 - Eurocentric"],
    type: "MCQ",
    horizontal: true,
    name: "overall",
  },
];
