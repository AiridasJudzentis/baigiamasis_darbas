import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Model from "./db/model.js";
import User from "./db/user.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://airidasjudz:Test123456@cluster0.evl7qvg.mongodb.net/modelMarketplace?retryWrites=true&w=majority",
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
    license,
  } = req.body;

  console.log("Received data:", req.body);

  const model = new Model({
    title,
    price,
    description,
    images,
    technical_info,
    categories,
    author,
    license,
  });

  try {
    await model.save();
    res.status(201).send(model);
  } catch (error) {
    console.error("Error creating model:", error.message);
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

app.get("/models/:id", async (req, res) => {
  try {
    const model = await Model.findById(req.params.id).populate("author");
    if (!model) {
      return res.status(404).send({ message: "Model not found" });
    }
    res.send(model);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving model", error });
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
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user", error });
  }
});

app.delete("/models/:id", async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return res.status(404).send({ message: "Model not found" });
    }

    await model.remove();
    res.send({ message: "Model deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting model", error });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", error });
  }
});

app.post("/signup", async (req, res) => {
  const { full_name, username, email, password } = req.body;
  const user = new User({
    full_name,
    username,
    email,
    password,
  });

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Error signing in", error });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
