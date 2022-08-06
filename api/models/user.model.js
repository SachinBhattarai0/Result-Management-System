const mongoose = require("mongoose");
const { emailValidatorRegEx, userRoles } = require("../utils/utils");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      lowercase: true,
      validate: {
        validator: (v) => emailValidatorRegEx.test(v),
        message: ({ value }) => `${value} is not in correct email format!`,
      },
    },
    password: {
      type: String,
      min: 8,
      max: 20,
    },
    role: {
      type: String,
      enum: userRoles,
      default: "teacher",
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
