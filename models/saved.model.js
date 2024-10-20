import mongoose from "mongoose";

const savedSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const savedModel =
  mongoose.models.saved || mongoose.model("saved", savedSchema);

export default savedModel;
