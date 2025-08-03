import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import api from "./routes/api.js";
import * as admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./caregivingally-firebase-adminsdk.json");

dotenv.config();

const app = express();

if (!admin.apps?.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

app.use(cors());
app.use(express.json());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello from CaregivingAlly backend!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default db;
