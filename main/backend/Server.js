const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const routes = require("./routes/ToDoRoutes");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const User = require("./models/User.js");
// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api", routes);
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Retrieve the user from the database
    const user = await User.findOne({ username, password });

    if (user) {
      // Authentication successful
      res.json({ success: true });
    } else {
      // Authentication failed
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});