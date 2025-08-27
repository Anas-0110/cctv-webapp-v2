const express = require("express");
const router = express.Router();
const Marker = require("../models/Marker");

// --- GET all markers ---
router.get("/", async (req, res) => {
  try {
    const markers = await Marker.find().lean(); // lean() returns plain JS objects
    const cleaned = markers.map(m => ({
      type: m.type,
      fx: m.fx,
      fy: m.fy,
      image: m.image,
      yellow: (m.yellow || []).map(y => ({
        image: y.image,
        fx: y.fx,
        fy: y.fy,
        width: y.width || 20,
        height: y.height || 40,
        rotation: y.rotation || 0,
        type: y.type || "cone"
      }))
    }));
    res.json(cleaned);
  } catch (err) {
    console.error("❌ GET /api/markers failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- POST markers (replace all then insert new) ---
router.post("/", async (req, res) => {
  try {
    const incoming = req.body.map(m => ({
      type: m.type,
      fx: Number(m.fx),
      fy: Number(m.fy),
      image: m.image || "cam1.jpg",
      yellow: (m.yellow || []).map(y => ({
        image: y.image || "cam2.jpg",
        fx: Number(y.fx) || 0.5,
        fy: Number(y.fy) || 0.6,
        width: Number(y.width) || 20,
        height: Number(y.height) || 40,
        rotation: Number(y.rotation) || 0,
        type: y.type || "cone"
      }))
    }));

    console.log("📥 Incoming markers:", JSON.stringify(incoming, null, 2));

    await Marker.deleteMany({});
    const inserted = await Marker.insertMany(incoming);

    console.log("✅ Inserted markers:", inserted.length);
    res.json({ success: true, count: inserted.length });
  } catch (err) {
    console.error("❌ Error saving markers:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
