const express = require("express");
const { predict } = require("../controllers/mlController");

const router = express.Router();

// POST: Predict heart disease
router.post("/predict", predict);

module.exports = router;
