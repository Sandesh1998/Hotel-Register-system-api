const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    website:{
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const hotelModel = mongoose.model("Hotel", hotelSchema);

module.exports = hotelModel;
