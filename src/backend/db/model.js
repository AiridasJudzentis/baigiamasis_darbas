import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: {
    featured: { type: String, required: true },
    additional: [{ type: String }],
  },
  technical_info: {
    triangles: { type: Number, required: true },
    vertices: { type: Number, required: true },
  },
  categories: [{ type: String, required: true }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  license: { type: String, required: true },
});

const Model = mongoose.model("Model", modelSchema);

export default Model;
