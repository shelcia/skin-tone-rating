import { Router } from "express";
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;
// import createCsvWriter from "csv-writer";
import { createObjectCsvWriter } from "csv-writer";
const createCsvWriter = createObjectCsvWriter;
import { records } from "../../index.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import csv from "csv-parser";

const router = Router();

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
router.get("/images", (req, res) => {
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
router.post("/evaluate", (req, res) => {
  const { id, evaluation } = req.body;
  console.log({ evaluation });
  const record = records.find((r) => r.id === id);
  if (!record) {
    return res.status(404).json({ status: 404, message: "Record not found" });
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
    return res
      .status(400)
      .json({ status: 400, message: "Evaluation limit reached" });
  }

  // Add evaluation data to the record
  record[`rater${raterSlot}_name`] = evaluation.name;
  record[`rater${raterSlot}_gender`] = evaluation.gender;
  record[`rater${raterSlot}_age`] = evaluation.age;
  record[`rater${raterSlot}_edu`] = evaluation.edu;
  record[`rater${raterSlot}_u_race`] = evaluation.u_race;
  record[`rater${raterSlot}_skin`] = evaluation.skin;

  record[`rater${raterSlot}_st`] = evaluation.st;
  record[`rater${raterSlot}_race`] = evaluation.race;
  record[`rater${raterSlot}_featuresa`] = evaluation.featuresa;
  record[`rater${raterSlot}_featuresb`] = evaluation.featuresb;
  record[`rater${raterSlot}_featuresc`] = evaluation.featuresc;

  // Update the CSV file
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    // header: Object.keys(records[0]),
    header: Object.keys(records[0]).map((header) => ({
      id: header,
      title: header,
    })),
  });

  csvWriter
    .writeRecords(records)
    .then(() => {
      res.status(200).json({ status: 200, message: "Evaluation recorded" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: 500, message: "Failed to update CSV" });
    });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(
  __dirname,
  "../../db/players_data_cleaned-test-2.csv"
);

// API endpoint to view CSV contents
router.get("/view-csv", (req, res) => {
  try {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        res.json(results);
      })
      .on("error", (err) => {
        res.status(500).send("Error reading CSV file");
        return;
      });
  } catch (error) {
    res.status(500).json({ status: "400", message: error });
    return;
  }
});

export default router;
