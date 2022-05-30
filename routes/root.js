const express = require("express");
const router = express.Router();
const path = require("path");

const filePath = (folder, file) => {
  return path.join(__dirname, "..", folder, file);
};

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(filePath("views", "index.html"));
});

router.get("/about(.html)?", (req, res) => {
  res.sendFile(filePath("views", "about.html"));
});

module.exports = router;
