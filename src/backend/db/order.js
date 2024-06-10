import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  model_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Model" }],
  total_price: Number,
  order_date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed", "canceled"] },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
