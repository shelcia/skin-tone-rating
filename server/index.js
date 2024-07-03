import express from "express";
import fs from "fs";
import csv from "csv-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT || 4050;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the CSV file
const csvFilePath = path.join(__dirname, "db/players_data_cleaned-test-2.csv");

const app = express();
app.use(cors());
app.use(express.json());

let records = [];

console.log(`CSV file path: ${csvFilePath}`);

// Function to check if file exists
const checkFileExists = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`File does not exist: ${filePath}`);
        reject(new Error(`File does not exist: ${filePath}`));
      } else {
        console.log(`File exists: ${filePath}`);
        resolve(true);
      }
    });
  });
};

// Load CSV function
const loadCsv = () => {
  return new Promise((resolve, reject) => {
    console.log("loadCsv function is being called");

    checkFileExists(csvFilePath)
      .then(() => {
        const results = [];
        console.log(`Attempting to read CSV file at: ${csvFilePath}`);

        fs.createReadStream(csvFilePath)
          .on("error", (err) => {
            console.error("Error opening CSV file:", err);
            reject(err);
          })
          .pipe(csv())
          .on("data", (data) => {
            try {
              for (let i = 1; i <= 3; i++) {
                data[`rater${i}_st`] = data[`rater${i}_st`] || "";
                data[`rater${i}_race`] = data[`rater${i}_race`] || "";
                data[`rater${i}_featuresa`] = data[`rater${i}_featuresa`] || "";
                data[`rater${i}_featuresb`] = data[`rater${i}_featuresb`] || "";
                data[`rater${i}_featuresc`] = data[`rater${i}_featuresc`] || "";
              }
              results.push(data);
            } catch (err) {
              console.error("Error processing data:", err);
            }
          })
          .on("end", () => {
            records = results;
            console.log(`Loaded ${records.length} records from CSV`);
            resolve(results);
          })
          .on("error", (err) => {
            console.error("Error reading CSV file:", err);
            reject(err);
          });
      })
      .catch((err) => {
        console.error("Failed to verify CSV file existence:", err);
        reject(err);
      });
  });
};

(async () => {
  try {
    await loadCsv();
    console.log("CSV data loaded successfully, starting server...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to load CSV data:", err);
  }
})();

import authRoute from "./routes/auth/auth.js";
import documentRoute from "./routes/document/document.js";
app.use("/api/auth", authRoute);
app.use("/api/document", documentRoute);

app.get("/", (req, res) => {
  res.send("<h3>Hey! Skin Tone Backend is up!</h3>");
});

export { records };
export default app;
