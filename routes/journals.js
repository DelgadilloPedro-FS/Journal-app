const express = require("express");
const journalCltr = require("../controllers/journals_controller");
const router = express.Router();

// GET ALL
router.get("/", journalCltr.getAll);
// POST
router.post("/", journalCltr.create);
// GET ONE
router.get("/:id", journalCltr.getById);
// PATCH UPDATE
router.patch("/:id", journalCltr.update);
// DELETE
router.delete("/:id", journalCltr.remove);

module.exports = router;
