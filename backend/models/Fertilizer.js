const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema(
  {
    type: { type: String, default: "fertilizers" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

fertilizerSchema.index({ name: 'text', description: 'text', details: 'text', category: 'text' });

module.exports = mongoose.model('Fertilizer', fertilizerSchema);
