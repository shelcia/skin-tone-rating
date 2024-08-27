const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
// const { createObjectCsvWriter, createCsvWriter } = require("csv-writer");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Evaluation = require("./models/Evaluation.js");
const { DEMO, RATER1, RATER2, RATER3 } = require("./constants/index.js");

dotenv.config();

const PORT = process.env.PORT || 4050;
// const _dirname = path.resolve();

// Define the path to the CSV file
const csvFilePath = path.join(
  __dirname,
  "../server/db/players_data_cleaned-test.csv"
);

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
            // console.log(results.splice(0, 1));
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

const authRoute = require("./routes/auth/auth.js");
const documentRoute = require("./routes/document/document.js");

app.use("/api/auth", authRoute);
app.use("/api/document", documentRoute);

app.get("/", (req, res) => {
  res.send("<h3>Hey! Skin Tone Backend is up!</h3>");
});

// function getEvaluationCount(record) {
//   let count = 0;
//   for (let i = 1; i <= 3; i++) {
//     if (record[`rater${i}_st`]) {
//       count++;
//     }
//   }
//   return count;
// }

async function getEvaluationCount(record) {
  try {
    const evaluations = await Evaluation.find({ id: record.id });
    return evaluations.length;
  } catch (error) {
    console.error("Error fetching evaluations:", error);
    return 0;
  }
}

// Function to get random elements from an array
function getRandomElements(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function isErrUni(uni) {
  const errUnis = [
    "South Florida Bulls",
    "Oklahoma State Cowboys",
    "Iowa State Cyclones",
    "San Jos√É¬© State Spartans",
  ];
  return errUnis.includes(uni);
}

app.get("/api/document/images", (req, res) => {
  // console.log(records);
  if (!records.length) {
    console.error("No records loaded");
    return res.status(500).json({ status: 500, message: "No records loaded" });
  }
  // let filteredRecords = records.filter(
  //   (record) => getEvaluationCount(record) < 3
  // );
  let filteredRecords = records.filter(async (record) => {
    const evaluationCount = await getEvaluationCount(record);
    return (
      evaluationCount < 3 &&
      record.filename !== "0" &&
      !isErrUni(record.university)
    );
  });

  // filteredRecords = filteredRecords.filter((record) => record.filename !== "0");
  const randomImages = getRandomElements(filteredRecords, 90).map((record) => ({
    id: record.id,
    photo_url: record.photo_url,
    filename: record.filename,
  }));
  res.json({ status: 200, length: randomImages.length, data: randomImages });
});

// Endpoint to submit evaluation
app.post("/api/document/evaluate", async (req, res) => {
  const { name, gender, age, edu, u_race, skin, evaluations, practise } =
    req.body;

  try {
    // Create an array of promises
    const promises = evaluations.map(async (evaluation) => {
      const record = new Evaluation({
        id: evaluation.id,
        name: name,
        gender: gender,
        age: age,
        edu: edu,
        u_race: u_race,
        skin: skin,
        evaluations: [
          {
            id: evaluation.id,
            st: evaluation.st,
            race: evaluation.race,
            featuresa: evaluation.featuresa,
            featuresb: evaluation.featuresb,
            featuresc: evaluation.featuresc,
          },
        ],
        practise: [
          {
            id: practise[0]?.id,
            st: practise[0]?.skin,
            race: practise[0]?.race,
            featuresa: practise[0]?.lip,
            featuresb: practise[0]?.nose,
            featuresc: practise[0]?.overall,
          },
          {
            id: practise[1]?.id,
            st: practise[1]?.skin,
            race: practise[1]?.race,
            featuresa: practise[1]?.lip,
            featuresb: practise[1]?.nose,
            featuresc: practise[1]?.overall,
          },
          {
            id: practise[2]?.id,
            st: practise[2]?.skin,
            race: practise[2]?.race,
            featuresa: practise[2]?.lip,
            featuresb: practise[2]?.nose,
            featuresc: practise[2]?.overall,
          },
          {
            id: practise[3]?.id,
            st: practise[3]?.skin,
            race: practise[3]?.race,
            featuresa: practise[3]?.lip,
            featuresb: practise[3]?.nose,
            featuresc: practise[3]?.overall,
          },
        ],
      });

      return await record.save();
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    res.status(200).json({ status: 200, message: "Evaluations recorded" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 500, message: "Failed to save evaluations" });
  }
});

// Endpoint to view specific CSV data
app.get("/api/document/view-csv/:id", (req, res) => {
  const { id } = req.params;
  let columnsToInclude = [];
  switch (id) {
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
      return res
        .status(400)
        .json({ status: "400", message: "Invalid column id" });
  }

  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => {
      const filteredData = {};
      columnsToInclude.forEach((column) => {
        if (data[column] !== undefined) {
          filteredData[column] = data[column];
        }
      });
      results.push(filteredData);
    })
    .on("end", () => {
      res.json(results);
    })
    .on("error", (err) => {
      res.status(500).send("Error reading CSV file");
    });
});

//CONNECTION TO DATABASE
mongoose.connect(process.env.DB_CONNECT).catch((error) => console.log(error));

// module.exports = { records };
