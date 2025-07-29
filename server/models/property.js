const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  host_id: String,
  title: String,
  description: String,
  location: String,
  price: Number,
  max_guests: Number,
  bedrooms: Number,
  bathrooms: Number,
  property_type: String,
  status: String,
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
