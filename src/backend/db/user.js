import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  full_name: String,
  date_joined: { type: Date, default: Date.now },
  role: { type: String, enum: ["admin", "designer", "buyer"] },
  purchased_models: [{ type: mongoose.Schema.Types.ObjectId, ref: "Model" }],
  uploaded_models: [{ type: mongoose.Schema.Types.ObjectId, ref: "Model" }],
});

const User = mongoose.model("User", userSchema);

export default User;
