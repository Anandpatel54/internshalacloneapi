const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      maxlength: [15, "password must be at least 15 characters"],
      minlength: [6, "password must be at least 6 characters"],
      // match: []
    },
  },
  { timestamps: true }
);

//password encryption
studentModel.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

studentModel.methods.comparepassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

studentModel.methods.getjwttoken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
  })
}

const Student = mongoose.model("student", studentModel);

module.exports = Student;
