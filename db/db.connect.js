const mongoose = require("mongoose");
require("dotenv").config();

const MongoUri = process.env.MONGODB;

const initializeDatabase = () => {
    mongoose
    .connect(MongoUri)
    .then(() => console.log("connected to database"))
    .catch((error) => console.log("Failed in connecting to database", error));
};

module.exports = initializeDatabase;