const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Fertilizer', fertilizerSchema);
