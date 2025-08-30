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
    "https://m.media-amazon.com/images/I/71BITpPSjML._SY741_.jpg",
  title: "LG 8 Kg 5 Star Smart Washing Machine",
  rating: 4.0,
  price: 28990,
  discountedPrice: 19990,
  discountPercentage: 31,
  //size: ["128 GB", "256 GB", "512 GB"],
  description: [
    "Fully-automatic top load washing machine with Inverter Motor and Smart wash technology: Affordable with great wash quality, Easy to use; Has both washing and drying functions.",
    "Capacity 8.0 Kg: Suitable for large families.",
    "Energy Star rating: 5 Star best in class efficiency; Smart Inverter Technology for up to 36 % energy savings; Energy consumption - 0.0085 KWh/kg/cycle & Water Consumption: 15.50 L/Kg/Cycle (Please refer BEE label for more information).",
    "Manufacturer Warranty: 2 years on product and 10 years on motor (T&C Apply).",
    "740 RPM: Higher spin speeds helps in faster wash and drying",
    "Wash Programs: 08 No. of Programs – Normal: built-in sensor detects the weight of the clothes, calculating wash, rinse and, spin settings accordingly | Quick Wash : Use this programme to wash lightly soiled clothes for a short time | Gentle(Wool/Saree): this programme to wash delicate fabrics such as lingerie and woolens | Strong: this programme for heavily soiled durable garments such as overalls, jeans | Pre-wash+Normal: this programme to pretreat immediate stain without handwash | Rinse+: This program will run same as Normal course with one extra rinse for all water levels | Aqua Reserve | Tub Clean: This is a special function to clean inside the drum of your appliance",
    "Drum / Pulsator type & Body material: TurboDrum enables the most powerful wash and removes the toughest dirt through a strong water stream of rotating drum and pulsator in the opposite direction | Semi Stainless Steel Drum | Panel information: POWER Button | Program Button | Extra Options and Functions | START/PAUSE Button | Cycle Status Indicator | Body Material - Steel"
  ],
  category: "68b007181fd567f51ce55c78",
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
});

app.get("/api/products/category/:productCategory", async (req, res) => {
  try{
    const productsByCategory = await ProductController.findProductsByCategory(req.params.productCategory);
    if(productsByCategory.length){
      res.status(200).json({products: productsByCategory});
    }else{
      res.status(404).json({message: "No data Found!"});
    }
  }catch(error){
    res.status(500).json({message: "Failed to load products by category" + error});
  }
});

app.listen(PORT, () => {
  console.log("server is running on PORT:", PORT);
});
