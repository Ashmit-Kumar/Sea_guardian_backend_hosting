
const express = require("express");
const { submitReport } = require("../controllers/reportController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/submit", upload.single('image'), submitReport);

module.exports = router;
