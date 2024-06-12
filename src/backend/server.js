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
    "mongodb+srv://airidasjudz:271378Vienas99sesi@cluster0.evl7qvg.mongodb.net/modelMarketplace?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/models", async (req, res) => {
  const {
    title,
    price,
    description,
    images,
    technical_info,
    categories,
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
    author,
    file_formats,
    license,
  });

  try {
    await model.save();
    res.status(201).send(model);
  } catch (error) {
    res.status(500).send({ message: "Error creating model", error });
  }
});

app.get("/models", async (req, res) => {
  try {
    const models = await Model.find();
    res.send(models);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving models", error });
  }
});

app.post("/users", async (req, res) => {
  const { username, email, password, full_name } = req.body;

  const user = new User({
    username,
    email,
    password,
    full_name,
  });

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user", error });
  }
});

app.post("/orders", async (req, res) => {
  const { user_id, model_ids, total_price } = req.body;

  const order = new Order({
    user_id,
    model_ids,
    total_price,
  });

  try {
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send({ message: "Error creating order", error });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving orders", error });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
