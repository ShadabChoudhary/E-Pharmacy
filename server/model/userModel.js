const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxlength: [30, "Name Cannot Exceed 30 Characters"],
    minlength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "Password should be greater than 8 characters"],
    select: false,
  },

  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
});

//hashing pass
// userSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 10);
// });

//JWT
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRETCODE, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

//Compare Pass
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

//generating Pass reset token
// userSchema.methods.getResetPasswordToken = () => {
//   // Generate token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hashing and adding resetPasswordToken to userSchema
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//   return resetToken;
// };

const userMODEL = mongoose.model("user", userSchema);

module.exports = userMODEL;
