const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

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

//password incription
studentModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

const Student = mongoose.model("student", studentModel);

module.exports = Student;