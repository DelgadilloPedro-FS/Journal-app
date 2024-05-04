const { model } = require("mongoose");
const Journal = require("../models/journal");

const getJournal = async (id) => {
  let journal;
  try {
    journal = await Journal.findById(id);
    if (journal === null)
      res.status(404).json({ messasge: "journal not found" });
  } catch (error) {
    return res.status(500).json({ messasge: error.messasge });
  }
  return journal;
};

const getAll = async (req, res) => {
  try {
    const journals = await Journal.find();
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ messasge: error.messasge });
  }
};
const getById = async (req, res) => {
  let journal;
  try {
    journal = getJournal(req.params.id);
    if (journal === null)
      res.status(404).json({ messasge: "journal not found" });
  } catch (error) {
    return res.status(500).json({ messasge: error.messasge });
  }
  res.journal = journal;
  res.json(res.journal);
};

const create = async (req, res) => {
  const journal = new Journal({
    name: req.body.name,
    entry: req.body.entry,
    author_First_Name: req.body.author_First_Name,
    author_Last_Name: req.body.author_Last_Name,
    img: req.body.img,
  });
  try {
    const newJournal = await journal.save();
    res.status(201).json(newJournal);
  } catch (error) {
    res.status(400).json({ messasge: error.messasge });
  }
};
const update = async (req, res) => {
  let journal = getJournal(req.params.id);
  if (req.body.name != null) journal = req.body.name;
  if (req.body.entry != null) journal = req.body.entry;
  try {
    const updatedJournal = journal
      .save()
      .then((savedJournal) => (savedJournal = journal));
    res.json(updatedJournal);
  } catch (error) {
    res.status(400).json({ messasge: error.messasge });
  }
};

const remove = async (req, res) => {
  let journal = getJournal(req.params.id);
  try {
    await journal.deleteOne();
    res.json({ messasge: "Removed journal" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
