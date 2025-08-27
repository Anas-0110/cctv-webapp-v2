const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // allows JSON body parsing
app.use(express.static("public"));


// --- Connect to MongoDB (replace with your MongoDB Atlas URL) ---
mongoose.connect(
  process.env.MONGO_URI,  // ✅ now it reads from Render environment variables
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// --- API ROUTES ---
const markersRouter = require("./routes/markers");
app.use("/api/markers", markersRouter);

// --- Example test route ---
// ✅ Serve static frontend files from "public" folder
app.use(express.static("public"));

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});