const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErorrHandler = require("../utils/ErrorHandler");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "home page" });
});
exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  res.status(202).json(student);
});
exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
  const student = await student
    .findOne({ email: req.body.email })
    .select(+password)
    .exec();
  if (!student)
    return next(
      new ErorrHandler("user not found with this email address", 404)
    );

  res.json(student);
});
exports.studentsignout = catchAsyncErrors(async (req, res, next) => {});
