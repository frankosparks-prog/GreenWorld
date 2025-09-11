const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    type: { type: String, default: "medicines" },
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

medicineSchema.index({ name: 'text', description: 'text', details: 'text', category: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);

