const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Assignment = require("../models/assignment.model");
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

userSchema.pre("save", async function () {
  if (!this.password) return;
  this.password = await bcrypt.hash(this.password, 8);
});

// userSchema.post("remove", async function () {
//   if (this.role !== "teacher") return;
//   await Assignment.deleteMany({ user: this._id.toString() });
// });

userSchema.methods.comparePassword = async function (value) {
  return await bcrypt.compare(value, this.password);
};

module.exports = mongoose.model("User", userSchema);
