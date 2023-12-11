const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 8080;
const mongoose = require("mongoose");
const { connect } = require('./Rabbit'); // Import the RabbitMQ connection function

const productRoutes = require("./route");

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/product-service');

// RabbitMQ connection
connect();

// Product routes
app.use("/product", productRoutes);


app.listen(PORT, () => {
  console.log(`Product-Service at ${PORT}`);
});
