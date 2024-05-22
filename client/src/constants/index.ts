export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const PREFIX = "FOOTBALL";

export const SURVEY_QUESTIONS = [
  {
    question: "Lip Fullness",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    type: "MCQ",
    horizontal: true,
    name: "lip",
  },
  {
    question: "Nose Shape",
    options: ["1", "2", "3", "4", "5", "6", "7"],
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
