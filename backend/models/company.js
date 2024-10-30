const mongoose = require("mongoose");
const companySchema = mongoose.Schema(
  {
    appliedDate: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyLink: {
      type: String,
    },
    companySize: {
      type: String,
      required: true,
    },
    glassdoorLink: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("company", companySchema);
module.exports = Company;
