import {
  LBLValMap,
  QuestionType,
  SurveyAnswerResponse,
} from "../services/utilities/types";

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
    options: [
      "1 - Very Eurocentric",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7 - Very Afrocentric",
    ],
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
    options: [
      "1 - Very Eurocentric",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7 - Very Afrocentric",
    ],
    type: "MCQ",
    horizontal: true,
    name: "overall",
  },
];

export const COLORS = [
  {
    color: "#f6ede4",
    label: "A",
  },
  {
    color: "#f3e7db",
    label: "B",
  },
  {
    color: "#f7ead0",
    label: "C",
  },
  {
    color: "#eadaba",
    label: "D",
  },
  {
    color: "#d7bd96",
    label: "E",
  },
  {
    color: "#a07e56",
    label: "F",
  },
  {
    color: "#825c43",
    label: "G",
  },
  {
    color: "#604134",
    label: "H",
  },
  {
    color: "#3a312a",
    label: "I",
  },
  {
    color: "#292420",
    label: "J",
  },
];

export const REQ_PROPS: string[] = ["lip", "nose", "overall", "race", "skin"];

export const NUM_PROPS: (keyof SurveyAnswerResponse)[] = [
  "lip",
  "nose",
  "overall",
];

export const LBL_VAL_MAP: LBLValMap = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "1 - very thin": 1,
  "7 - very full": 7,
  "1 - very thin/narrow": 1,
  "7 - very flat/broad": 7,
  "1 - Very Eurocentric": 1,
  "7 - Very Afrocentric": 7,
};
