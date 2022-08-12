const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

classSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Class", classSchema);
