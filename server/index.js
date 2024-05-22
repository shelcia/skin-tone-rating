const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const cors = require("cors");
const PORT = process.env.PORT || 4050;

const app = express();
app.use(cors());
app.use(express.json());

const csvFilePath = "./db/players_data_cleaned-test.csv";
let records = [];

// Load CSV data into memory
function loadCsv() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => {
        // Parse evaluation columns
        for (let i = 1; i <= 3; i++) {
          data[`rater${i}_st`] = data[`rater${i}_st`] || "";
          data[`rater${i}_race`] = data[`rater${i}_race`] || "";
          data[`rater${i}_featuresa`] = data[`rater${i}_featuresa`] || "";
          data[`rater${i}_featuresb`] = data[`rater${i}_featuresb`] || "";
          data[`rater${i}_featuresc`] = data[`rater${i}_featuresc`] || "";
        }
        results.push(data);
      })
      .on("end", () => {
        records = results;
        resolve(results);
      })
      .on("error", reject);
  });
}

// Helper function to get the evaluation count
function getEvaluationCount(record) {
  let count = 0;
  for (let i = 1; i <= 3; i++) {
    if (record[`rater${i}_st`]) {
      count++;
    }
  }
  return count;
}

// Function to get random elements from an array
function getRandomElements(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Endpoint to fetch images
app.get("/images", (req, res) => {
  let filteredRecords = records.filter(
    (record) => getEvaluationCount(record) < 3
  );
  filteredRecords = filteredRecords.filter((record) => record.filename !== "0");
  const randomImages = getRandomElements(filteredRecords, 90).map((record) => ({
    id: record.id,
    photo_url: record.photo_url,
    filename: record.filename,
  }));
  res.json({ status: 200, length: randomImages.length, data: randomImages });
});

// Endpoint to submit evaluation
app.post("/evaluate", (req, res) => {
  const { id, evaluation } = req.body;
  const record = records.find((r) => r.id === id);
  if (!record) {
    return res.status(404).send("Record not found");
  }

  // Find the next available rater slot
  let raterSlot = null;
  for (let i = 1; i <= 3; i++) {
    if (!record[`rater${i}_st`]) {
      raterSlot = i;
      break;
    }
  }
  if (!raterSlot) {
    return res.status(400).send("Evaluation limit reached");
  }

  // Add evaluation data to the record
  record[`rater${raterSlot}_st`] = evaluation.st;
  record[`rater${raterSlot}_race`] = evaluation.race;
  record[`rater${raterSlot}_featuresa`] = evaluation.featuresa;
  record[`rater${raterSlot}_featuresb`] = evaluation.featuresb;
  record[`rater${raterSlot}_featuresc`] = evaluation.featuresc;

  // Update the CSV file
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: Object.keys(records[0]),
  });

  csvWriter
    .writeRecords(records)
    .then(() => {
      res.send("Evaluation recorded");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Failed to update CSV");
    });
});
app.get("/", (req, res) => {
  res.send(`<h3>Hey! Skin Tone Backend is up !</h3>`);
});

// Start server and load CSV data
loadCsv()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server up and running at  ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to load CSV data:", err);
  });
