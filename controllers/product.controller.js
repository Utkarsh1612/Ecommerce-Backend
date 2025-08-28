const Product = require("../models/product");

exports.createProduct = async (newProduct) => {
  try {
    const product = new Product(newProduct);
    const createProduct = await product.save();
    console.log("created Product: ", createProduct);
  } catch (error) {
    console.log("Error in creating product", error);
  }
};

exports.getAllProducts = async () => {
  try {
    const allProducts = await Product.find().populate("category");
    return allProducts;
  } catch (error) {
    console.log("Error in fetching all products", error);
  }
};