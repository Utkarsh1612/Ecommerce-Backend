const express = require("express");
const initializeDatabase = require("./db/db.connect");
const Product = require("./models/product.models");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

initializeDatabase();

const cors = require("cors");
const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));

const newProduct = {
  imageUrl:
    "https://m.media-amazon.com/images/I/71LnycrT7qL._AC_UL480_FMwebp_QL65_.jpg",
  title: "TAGDO Men's Regular Fit Casual Shirt (5171)",
  rating: 4.0,
  price: 1599,
  discountedPrice: 389,
  discountPercentage: 76,
  size: ["S", "M", "L", "XL", "XXL"],
  description: [
    "Fabric: Polyester, Designed to withstand daily wear and maintain its shape and color over time.",
    "Versatile design : Ideal for casual outings, everyday wear for a stylish ensemble",
    "Stylish color options : Choose from a selection of classic and contemporary colors to suit your preference.",
    "Fit : Modern regular fit for a sleek and flattering look.",
    "Surface : Luxuriously soft texture that feels gentle against the skin for all-day wear.",
  ],
  category: "Men",
};

const createProduct = async (newProduct) => {
  try {
    const product = new Product(newProduct);
    const createProduct = await product.save();
    console.log("created Product: ", createProduct);
  } catch (error) {
    console.log("Error in creating product", error);
  }
};

//createProduct(newProduct);

const getAllProducts = async () => {
  try {
    const allProducts = await Product.find();
    return allProducts;
  } catch (error) {
    console.log("Error in fetching all products", error);
  }
};

app.get("/", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    if (allProducts.length) {
      res.status(200).json({ data: { products: allProducts } });
    } else {
      res.status(404).json({ message: "No Product Found!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get all products!", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("server is running on PORT:", PORT);
});
