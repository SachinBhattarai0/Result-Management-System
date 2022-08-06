const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
