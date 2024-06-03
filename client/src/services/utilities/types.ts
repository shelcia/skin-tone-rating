export interface Introduction {
  question: string;
  options: string[];
  type: "MCQ" | "TEXT";
}

export interface QuestionType {
  question: string;
  options: string[];
  type?: string;
  name: keyof SurveyAnswerResponse;
  horizontal?: boolean;
}

export interface RaceAnswer {
  id: string;
  skin: string;
  race: string;
  lip: number;
  nose: number;
  overall: number;
}

export interface SurveyAnswers {
  [key: string]: string | number;
  id: string;
  skin: string;
  race: string;
  lip: number;
  nose: number;
  overall: number;
}

export interface SurveyAnswerResponse {
  [key: string]: string | number | SurveyAnswers[];
  gender: string;
  age: number;
  education: string;
  race: string;
  skin: string;
  // pSkin: number;
  // pRace: string;
  // pLip: number;
  // pNose: number;
  // pOverall: number;
  pratise: SurveyAnswers[];
  answers: SurveyAnswers[];
  email: string;
  isInterested: string;
}

export interface SurveyResponse {
  data: number;
  message: SurveyAnswerResponse[];
}

export interface SurveyAnswerPayload {
  id: string;
  evaluation: {
    st: string;
    race: string;
    featuresa: string | number;
    featuresb: string | number;
    featuresc: string | number;
  };
}

export interface PersonImage {
  id: string;
  photo_url: string;
  filename: string;
}

export interface PersonImageResponse {
  status: number;
  data: PersonImage[];
  length: number;
}

export interface ApiResponse {
  status: string;
  message: string;
}

export type LBLKeys =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "1 - very thin"
  | "7 - very full"
  | "1 - very thin/narrow"
  | "7 - very flat/broad"
  | "1 - Very Eurocentric"
  | "7 - Very Afrocentric"
  | string;

export type LBLValMap = {
  [key in LBLKeys]: number;
};
