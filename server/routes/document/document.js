import { Router } from "express";
import { createObjectCsvWriter } from "csv-writer";
const createCsvWriter = createObjectCsvWriter;
import { records } from "../../index.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import csv from "csv-parser";
import { DEMO, RATER1, RATER2, RATER3 } from "../../constants/index.js";

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
  const { name, gender, age, edu, u_race, skin, evaluations } = req.body;
  console.log({ evaluations });

  let csvWriter;

  evaluations.map((evaluation) => {
    const record = records.find((r) => r.id === evaluation.id);
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

    record[`rater${raterSlot}_name`] = name;
    record[`rater${raterSlot}_gender`] = gender;
    record[`rater${raterSlot}_age`] = age;
    record[`rater${raterSlot}_edu`] = edu;
    record[`rater${raterSlot}_u_race`] = u_race;
    record[`rater${raterSlot}_skin`] = skin;

    // Add evaluation data to the record
    record[`rater${raterSlot}_st`] = evaluation.st;
    record[`rater${raterSlot}_race`] = evaluation.race;
    record[`rater${raterSlot}_featuresa`] = evaluation.featuresa;
    record[`rater${raterSlot}_featuresb`] = evaluation.featuresb;
    record[`rater${raterSlot}_featuresc`] = evaluation.featuresc;

    // Update the CSV file
    csvWriter = createCsvWriter({
      path: csvFilePath,
      // header: Object.keys(records[0]),
      header: Object.keys(records[0]).map((header) => ({
        id: header,
        title: header,
      })),
    });
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
router.get("/view-csv/:id", (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const csvFilePath = path.join(
      __dirname,
      "../../db/players_data_cleaned-test-2.csv"
    );
    const results = [];

    let columnsToInclude = [];
    switch (req.params.id) {
      case "DEMO":
        columnsToInclude = DEMO;
        break;
      case "RATER1":
        columnsToInclude = RATER1;
        break;
      case "RATER2":
        columnsToInclude = RATER2;
        break;
      case "RATER3":
        columnsToInclude = RATER3;
        break;
      default:
        columnsToInclude = [];
        break;
    }

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
        // const filteredData = {};
        // columnsToInclude.forEach((column) => {
        //   if (data[column] !== undefined) {
        //     filteredData[column] = data[column];
        //   }
        // });
        // results.push(filteredData);
      })
      .on("end", () => {
        res.json(results);
      })
      .on("error", (err) => {
        res.status(500).send("Error reading CSV file");
      });
  } catch (error) {
    res.status(500).json({ status: "400", message: error });
  }
});

export default router;
