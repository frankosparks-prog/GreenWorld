const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  type: { type: String, default: "testimonial" },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

testimonialSchema.index({ name: 'text', message: 'text' }); 

module.exports = mongoose.model('Testimonial', testimonialSchema);
