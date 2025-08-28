const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Men", "Women", "Kids", "Electronics", "Furniture"],
  },
  description: String,
  image: String,
},{
  timestamps: true,
});

const Category = mongoose.model("ecom-category", CategorySchema);

module.exports = Category;
