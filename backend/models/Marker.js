const mongoose = require("mongoose");

const markerSchema = new mongoose.Schema({
  type: { type: String, enum: ["red", "yellow"], required: true },
  fx: Number,
  fy: Number,
  image: String,
  yellow: [
    {
      image: String,
      fx: Number,
      fy: Number,
      width: { type: Number, default: 20 },    // ✅ added
      height: { type: Number, default: 40 },   // ✅ added
      rotation: { type: Number, default: 0 }   // ✅ NEW
    }
  ]
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Marker || mongoose.model("Marker", markerSchema);