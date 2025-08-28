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

exports.getAllCategories = async () => {
    try{
        const allCategories = await Category.find();
        return allCategories;
    }catch(error){
        console.log("some error occured categories not found",error);
    }
}

exports.getCategoryById = async (id) => {
    try{
        const category = await Category.findById(id);
        return category;
    }catch(error){
        console.log("error occured in fetching by Id", error);
    }
}
