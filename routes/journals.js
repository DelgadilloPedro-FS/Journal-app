const express = require("express");
const journalCltr = require("../controllers/journalsController");
const router = express.Router();

// GET ALL
router.get("/", journalCltr.getAll);
// GET ONE
router.get("/:id", journalCltr.getById);
// POST
router.post("/", journalCltr.create);
// PATCH UPDATE
router.patch("/:id", journalCltr.update);
// DELETE
router.delete("/:id", journalCltr.remove);

module.exports = router;
