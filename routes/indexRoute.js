const express = require("express");
const router = express.Router();
const {homepage} = require("../controllers/indexController")

//GET routes
router.get("/", homepage);

module.exports = router;
