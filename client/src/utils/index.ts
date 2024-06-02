// import { REQ_PROPS } from "../constants";
import { SurveyAnswers } from "../services/utilities/types";

export const hasRequiredProperties = (answers: SurveyAnswers[]) => {
  const ans = answers.map(
    (answer) =>
      answer.lip !== 0 &&
      answer.nose !== 0 &&
      answer.overall !== 0 &&
      answer.race !== "" &&
      answer.skin !== ""
  );
  console.log(ans);
  return ans.includes(false) ? false : true;
  //   return REQ_PROPS.every((prop) => prop in answer);
};
