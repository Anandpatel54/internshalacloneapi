const express = require("express");
const router = express.Router();
const { homepage, studentsignup, studentsignin, studentsignout } = require("../controllers/indexController");

//GET routes
router.get("/", homepage);

//POST /student/signup routes
router.post("/student/signup", studentsignup);

//POST /student/signin routes
router.post("/student/signin", studentsignin);

//POST /student/signoup routes
router.get("/student/signout", studentsignout);

module.exports = router;
