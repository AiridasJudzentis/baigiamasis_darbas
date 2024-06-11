import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Model from "./db/model.js";
import User from "./db/user.js";
import Order from "./db/order.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://airidasjudz:271378Vienas99sesi@cluster0.evl7qvg.mongodb.net/modelMarketplace?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Model CRUD routes
app.post("/models", async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      images,
      technical_info,
      categories,
      tags,
      author,
      file_formats,
      license,
    } = req.body;

    const model = new Model({
      title,
      price,
      description,
      images,
      technical_info,
      categories,
      tags,
      author,
      file_formats,
      license,
    });

    await model.save();
    res.send(model);
  } catch (error) {
    console.error("Error creating model:", error);
    res.status(500).send({ message: "Error creating model", error });
  }
});

app.get("/models", async (req, res) => {
  try {
    const models = await Model.find();
    res.send(models);
  } catch (error) {
    console.error("Error retrieving models:", error);
    res.status(500).send({ message: "Error retrieving models", error });
  }
});

app.get("/models/:id", async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    res.send(model);
  } catch (error) {
    console.error("Error retrieving model:", error);
    res.status(500).send({ message: "Error retrieving model", error });
  }
});

// User CRUD routes
app.post("/users", async (req, res) => {
  try {
    const { username, email, password, full_name } = req.body;

    const user = new User({
      username,
      email,
      password,
      full_name,
    });

    await user.save();
    res.send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Error creating user", error });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send({ message: "Error retrieving users", error });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).send({ message: "Error retrieving user", error });
  }
});

// Order CRUD routes
app.post("/orders", async (req, res) => {
  try {
    const { user_id, model_ids, total_price, status } = req.body;

    const order = new Order({
      user_id,
      model_ids,
      total_price,
      status,
    });

    await order.save();
    res.send(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ message: "Error creating order", error });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).send({ message: "Error retrieving orders", error });
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).send({ message: "Error retrieving order", error });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
