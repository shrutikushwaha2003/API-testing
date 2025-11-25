const dotenv = require('dotenv')
dotenv.config()
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("Server Running!"));

app.listen(3000, () => console.log("Server running on 3000"));
