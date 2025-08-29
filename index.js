const express = require("express");
const initializeDatabase = require("./db/db.connect");

const Product = require("./models/product");
const Category = require("./models/category");

const CategroyController = require("./controllers/category.controller");
const ProductController = require("./controllers/product.controller");

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
  category: "68b007161fd567f51ce55c71",
};

//ProductController.createProduct(newProduct);

const categories = [
  {
    name: "Men",
    description: "Clothing and accessories designed for men, including shirts, trousers, and footwear."
  },
  {
    name: "Women",
    description: "Fashion and accessories for women, featuring dresses, tops, and jewelry."
  },
  {
    name: "Kids",
    description: "Apparel and gear for children, including toys, clothes, and school supplies."
  },
  {
    name: "Electronics",
    description: "Latest gadgets and devices, such as smartphones, laptops, and headphones."
  },
  {
    name: "Furniture",
    description: "Home and office furniture, including sofas, tables, and storage solutions."
  }
];

//CategroyController.createCategory(categories);

app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await ProductController.getAllProducts();
    if (allProducts.length) {
      res.status(200).json({products: allProducts });
    } else {
      res.status(404).json({ message: "No Product Found!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get all products!", error});
  }
});

app.get("/api/products/:productId", async (req, res) => {
  try{
    const product = await ProductController.getProductById(req.params.productId);
    if(product){
      res.status(200).json({product: product});
    }else{
      res.status(404).json({message: "Product Not Found By Id", error});
    }
  }catch(error){
    res.status(500).json({message: "Failed to get product by Id", error});
  }
});

app.get("/api/categories", async (req, res) => {
  try{  
    const allCategories = await CategroyController.getAllCategories();
    if(allCategories.length){
      res.status(200).json({ categories: allCategories});
    }else{
      res.status(404).json({message: "No Category Found!"});
    }
  }catch(error){
    res.status(500).json({message: "Failed to fetch all categories", error});
  }
});

app.get("/api/categories/:categoryId", async (req, res) => {
  try{
    const category = await CategroyController.getCategoryById(req.params.categoryId);
    if(category){
      res.status(200).json({category: category});
    }else{
      res.status(404).json({message: "Category Not Found By Id"});
    }
  }catch(error){
    res.status(500).json({message: "Failed to fetch category by Id", error});
  }
})

app.listen(PORT, () => {
  console.log("server is running on PORT:", PORT);
});
