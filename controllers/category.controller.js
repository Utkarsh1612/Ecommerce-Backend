const Category = require("../models/category");

exports.createCategory = async (categories) => {
  try {
    for (let category of categories) {
      const newCategory = new Category(category);
      const savedCategory = await newCategory.save();
      console.log("Saved:", savedCategory);
    }
    console.log("All categories saved successfully!");
  } catch (error) {
    console.log("Error in saving categories:", error);
  }
};
