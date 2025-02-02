import mongoose from "mongoose";

const form1Schema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  shopCategory: {
    type: String,
    required: true,
  },
  shopSize: {
    type: String,
    required: true,
  },
  shopLocation: {
    area: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  createdBy: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const FORM1 = mongoose.model("form1", form1Schema);
export default FORM1;