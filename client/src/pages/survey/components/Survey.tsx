import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { PersonImage, SurveyAnswers } from "../../../services/utilities/types";
import { useSurveyAnswerContext } from "../../../context/SurveyAnswerContext";
import CommonSnackbar from "../../../common/CommonSnackbar";
import SurveySection from "./SurveySection";
import { imageService } from "../../../services/utilities/provider";

interface SurveyComponentProps {
  isSurveySubmitted: boolean;
}

const SurveyComponent: React.FC<SurveyComponentProps> = ({
  isSurveySubmitted,
}) => {
  // const [isContextSubmitted, setIsContextSubmitted] = useState(false);

  const [images, setImages] = useState<PersonImage[]>([
    {
      id: "4067",
      photo_url:
        "https://a.espncdn.com/i/headshots/college-football/players/full/4833362.png",
      filename: "72.Harvey.OL.Oklahoma State Cowboys.jpg",
    },
    {
      id: "10126",
      photo_url:
        "https://a.espncdn.com/i/headshots/college-football/players/full/4361070.png",
      filename: "52.Schramm.LB.Boise State.jpg",
    },
  ]);

  const [answers, setAnswers] = useState<SurveyAnswers[]>([
    {
      skin: 0,
      race: "",
      lip: 0,
      nose: 0,
      overall: 0,
    },
  ]);
  // const [contextAnswers, setContextAnswers] = useState([]);

  const { surveyAnswers, setSurveyAnswers } = useSurveyAnswerContext();

  const [openSnack, setIsOpenSnack] = useState(false);

  const fetchImages = async () => {
    imageService.getAll().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setImages(res.data.splice(0, 3));
      }
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (isSurveySubmitted) {
      const updatedSurveyAnswers = { ...surveyAnswers };
      updatedSurveyAnswers.answers = answers;
      setSurveyAnswers(updatedSurveyAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSurveySubmitted]);

  return (
    <Box sx={{ width: "100%" }}>
      <CommonSnackbar
        open={openSnack}
        handleClose={() => setIsOpenSnack(false)}
      />

      {images.map((image, index: number) => (
        <SurveySection
          key={image.id}
          image={images[index]}
          index={index}
          answers={answers}
          setAnswers={setAnswers}
          isSurveySubmitted={isSurveySubmitted}
        />
      ))}
    </Box>
  );
};

export default SurveyComponent;
