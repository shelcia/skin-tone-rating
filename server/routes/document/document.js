const { Router } = require("express");
const Evaluation = require("../../models/Evaluation.js");

const router = Router();

router.get("/evaluations", async (req, res) => {
  try {
    const evaluations = await Evaluation.find().exec();
    res.status(200).send({ status: "200", message: evaluations });
  } catch (err) {
    res.status(500).send({ status: "500", message: err });
  }
});

module.exports = router;
