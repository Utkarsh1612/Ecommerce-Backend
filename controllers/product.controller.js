const product = require("../models/product");
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

exports.getProductById = async (id) => {
    try{
        const product = await Product.findById(id);
        return product;
    }catch(error){
        console.log("Error in fetching product by Id", error);
    }
}

exports.findProductsByCategory = async (category) => {
  try{
    console.log("category: ", category);
    const products = await Product.find().populate({path: "category", match: {name: category}});
    const filterdProducts = products.filter((product) => product.category != null);
    return filterdProducts;
  }catch(error){
    console.log("error occured in fetching products by category" + error);
  }
}