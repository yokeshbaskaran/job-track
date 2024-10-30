require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./router/jobRoutes");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://job-track-2gja.onrender.com"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => {
    console.log("DB error!" + err.message);
  });

app.use("/api", routes);

// --------------------Deployment---------------

const path = require("path");

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

//--------------------Deployment---------------

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
