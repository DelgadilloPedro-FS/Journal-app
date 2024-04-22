const mongoose = require("mongoose");
const journalSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  author_First_Name: {
    type: String,
    require: true,
  },
  author_Last_Name: {
    type: String,
    require: true,
  },
  entry: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Journal", journalSchema);
