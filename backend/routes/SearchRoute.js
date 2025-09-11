// // routes/searchRoute.js
// const express = require("express");
// const router = express.Router();
// const Fertilizer = require("../models/Fertilizer");
// const Medicine = require("../models/Medicine");
// const Testimonials = require("../models/Testimonials");
// const FAQ = require("../models/FAQ");

// router.get("/", async (req, res) => {
//   const q = req.query.q?.toLowerCase();
//   if (!q) return res.json([]);

//   try {
//     const [faq, fertilizer, medicine, testimonials] = await Promise.all([
//       FAQ.find({ $text: { $search: q }, isVerified: true }),
//       Fertilizer.find({ $text: { $search: q }, isVerified: true }),
//       Medicine.find({ $text: { $search: q }, isVerified: true }),
//       Testimonials.find({ $text: { $search: q }, isVerified: true }),
//     ]);

//     res.json([...faq, ...fertilizer, ...medicine, ...testimonials]);
//   } catch (err) {
//     console.error("Search error:", err);
//     res.status(500).json({ error: "Search failed" });
//   }
// });

// module.exports = router;
// routes/searchRoute.js
const express = require("express");
const router = express.Router();
const Fertilizer = require("../models/Fertilizer");
const Medicine = require("../models/Medicine");
const Testimonials = require("../models/Testimonials");
const FAQ = require("../models/FAQ");

router.get("/", async (req, res) => {
  const q = req.query.q?.toLowerCase();
  if (!q) return res.json([]);

  try {
    const regex = new RegExp(q, "i"); // case-insensitive regex

    const [faq, fertilizer, medicine, testimonials] = await Promise.all([
      FAQ.find({
        isVerified: true,
        $or: [
          { question: regex },
          { answer: regex }
        ]
      }),
      Fertilizer.find({
        isVerified: true,
        $or: [
          { name: regex },
          { description: regex },
          { details: regex },
          { category: regex }
        ]
      }),
      Medicine.find({
        isVerified: true,
        $or: [
          { name: regex },
          { description: regex },
          { details: regex },
          { category: regex }
        ]
      }),
      Testimonials.find({
        isVerified: true,
        $or: [
          { name: regex },
          { message: regex }
        ]
      }),
    ]);

    res.json([...faq, ...fertilizer, ...medicine, ...testimonials]);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
