import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  images: {
    featured: String,
    additional: [String],
  },
  technical_info: {
    triangles: Number,
    vertices: Number,
  },
  categories: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  file_formats: [String],
  license: String,
});

const Model = mongoose.model("Model", modelSchema);

export default Model;
