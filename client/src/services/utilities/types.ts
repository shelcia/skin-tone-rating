export interface Introduction {
  question: string;
  options: string[];
  type: "MCQ" | "TEXT";
}

export interface QuestionType {
  question: string;
  options: string[];
  type?: string;
  name: keyof SurveyAnswerPayload;
  horizontal?: boolean;
}

export interface RaceAnswer {
  skin: number;
  race: string;
  lip: number;
  nose: number;
  overall: number;
}

export interface SurveyAnswers {
  [key: string]: string | number;
  skin: number;
  race: string;
  lip: number;
  nose: number;
  overall: number;
}

export interface SurveyAnswerPayload {
  [key: string]: string | number | SurveyAnswers[];
  gender: string;
  age: number;
  education: string;
  race: string;
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
  message: SurveyAnswerPayload[];
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
