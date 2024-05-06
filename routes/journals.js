const express = require("express");
const passport = require("passport");

const passportService = require("../services/passport");

const protectedRoute = passport.authenticate("jwt", { session: false });

const router = express.Router();

const Journal = require("../models/journal");

const getJournal = async (req, res, next) => {
  let journal;
  try {
    journal = await Journal.findById(req.params.id);
    if (journal === null)
      res.status(404).json({ messasge: "journal not found" });
  } catch (error) {
    return res.status(500).json({ messasge: error.messasge });
  }
  res.journal = journal;
  return next();
};

// GET ALL
router.get("/", protectedRoute, async (req, res) => {
  try {
    const journals = await Journal.find();
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ messasge: error.messasge });
  }
});
// GET ONE
router.get("/:id", getJournal, async (req, res) => {
  res.json(res.journal);
});

// POST
router.post("/", async (req, res) => {
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
});

// PATCH UPDATE
router.patch("/:id", getJournal, async (req, res) => {
  if (req.body.name != null) res.journal.name = req.body.name;
  if (req.body.entry != null) res.journal.entry = req.body.entry;
  try {
    const updatedJournal = await res.journal
      .save()
      .then((savedJournal) => (savedJournal = res.journal));
    res.json(updatedJournal);
  } catch (error) {
    res.status(400).json({ messasge: error.messasge });
  }
});

// DELETE
router.delete("/:id", getJournal, async (req, res) => {
  try {
    await res.journal.deleteOne();
    res.json({ messasge: "Removed journal" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
