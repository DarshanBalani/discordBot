const mongoose = require("mongoose");

const schema = mongoose.Schema;

const urlSchema = new schema(
  {
    shortId: {
      type: String,
    },
    originalUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("url", urlSchema);
