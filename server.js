const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8000;

const DATABASE_URL = process.env.DATABASE_URL;

const journalRouter = require("./routes/journals");

const db = mongoose.connection;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

db.on("error", (error) => console.error(error));

db.once("open", () => console.log("db connected"));

mongoose.connect(DATABASE_URL);
app.use(express.json())

app.use("/journals", journalRouter);

app.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});
