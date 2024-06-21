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
const csvFilePath = path.join(
  process.cwd(),
  "public/db/players_data_cleaned-test-2.csv"
);

const app = express();
app.use(cors());
app.use(express.json());

let records = [];

console.log(`CSV file path: ${csvFilePath}`);

// Load CSV data into memory
const loadCsv = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => {
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
        console.log(`Loaded ${records.length} records from CSV`);
        resolve(results);
      })
      .on("error", (err) => {
        console.error("Error reading CSV file:", err);
        reject(err);
      });
  });
};

// Start server and load CSV data
loadCsv()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to load CSV data:", err);
  });

// Route Middleware
import authRoute from "./routes/auth/auth.js";
import documentRoute from "./routes/document/document.js";
app.use("/api/auth", authRoute);
app.use("/api/document", documentRoute);

app.get("/", (req, res) => {
  res.send("<h3>Hey! Skin Tone Backend is up!</h3>");
});

export default app;
