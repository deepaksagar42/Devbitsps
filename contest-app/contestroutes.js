const express = require("express");
const Contest = require("./contest");
const router = express.Router();

// ✅ TEST ROUTE
router.get("/", (req, res) => {
  res.json({ message: "Contest API is working!" });
});

// ✅ GET ALL CONTESTS
router.get("/all", async (req, res) => {
  try {
    const contests = await Contest.find().populate("createdBy", "username");
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contests", error });
  }
});

module.exports = router;
