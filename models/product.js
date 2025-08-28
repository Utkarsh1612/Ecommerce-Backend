const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
    },
    discountPercentage: {
        type: Number,
    },
    size: {
        type: [String],
        required: true,
        enum: ["S", "M", "L", "XL", "XXL"],
    },
    description: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ecom-category",
        requried: true,
    }
},{
    timestamps: true,
})

const product = mongoose.model("ecom-product", ProductSchema);

module.exports = product;