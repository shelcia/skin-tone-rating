import React from "react";
import { Alert, Box, Typography } from "@mui/material";

import Img1 from "../../../assets/people/1.png";
import Img2 from "../../../assets/people/2.png";
import Img3 from "../../../assets/people/3.png";

import Imga from "../../../assets/people/a.png";
import Imgb from "../../../assets/people/b.png";
import Imgc from "../../../assets/people/c.png";

const Details: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Alert severity="warning" variant="standard">
        Please Read them carefully.
      </Alert>
      <Typography>
        The examples below show individuals with a thin/narrow nose and thin
        lips.
      </Typography>
      <Typography>
        <b>Thin lips</b> refer to lips that have a narrow width and less
        fullness. The upper and lower lips are relatively flat and do not
        protrude significantly from the face.
      </Typography>

      <Typography>
        A <b>thin/narrow nose</b> is characterized by its narrow bridge and
        slim, refined appearance, with less width across the nostrils compared
        to a broader nose.
      </Typography>

      <Box sx={{ display: "flex" }}>
        {[Img1, Img2, Img3].map((img, idx: number) => (
          <img
            src={img}
            alt={`person-${idx + 1}`}
            style={{ width: 200, height: 160, objectFit: "cover" }}
            loading="lazy"
          />
        ))}
      </Box>

      <Typography>
        The examples below show individuals with flat/broad noses and full lips.
      </Typography>
      <Typography>
        <b>Lip fullness</b> refers to the extent to which the lips appear plump,
        rounded, and voluminous.
      </Typography>

      <Typography>
        A <b>flat broad nose</b> is characterized by a broad, low nasal bridge
        and wide nostrils.
      </Typography>

      <Box sx={{ display: "flex" }}>
        {[Imga, Imgb, Imgc].map((img, idx: number) => (
          <img
            src={img}
            alt={`person-${idx + 1}`}
            style={{ width: 200, height: 160, objectFit: "cover" }}
            loading="lazy"
          />
        ))}
      </Box>

      <Alert severity="success" variant="filled">
        On the following page, you'll have the chance to practice rating before
        we proceed to the actual study.
      </Alert>
    </Box>
  );
};

export default Details;
