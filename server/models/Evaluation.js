const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  id: String,
  name: String,
  gender: String,
  age: Number,
  edu: String,
  u_race: String,
  skin: String,
  evaluations: [
    {
      id: String,
      st: String,
      race: String,
      featuresa: String,
      featuresb: String,
      featuresc: String,
    },
  ],
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;
