const express = require("express");
const router = express.Router();
const { getMorePlaces } = require("../controllers/placeController");

// GET /api/more-places
router.get("/", getMorePlaces);

module.exports = router;
