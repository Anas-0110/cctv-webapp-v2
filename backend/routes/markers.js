const express = require("express");
const router = express.Router();

// ✅ Import the shared Marker model (with width, height, rotation)
const Marker = require("../models/Marker");

// --- GET all markers ---
router.get("/", async (req, res) => {
  try {
    const markers = await Marker.find();
    res.json(markers);
  } catch (err) {
    console.error("❌ GET /api/markers failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- POST markers (replace all then insert new) ---
router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming markers:", JSON.stringify(req.body, null, 2));
    await Marker.deleteMany({});
    const inserted = await Marker.insertMany(req.body);
    console.log("✅ Inserted markers:", inserted.length);
    res.json({ success: true, count: inserted.length });
  } catch (err) {
    console.error("❌ Error saving markers:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
