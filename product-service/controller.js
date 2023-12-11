// productController.js
const Product = require("./Product"); // Make sure to provide the correct path to your Product model
const isAuthenticated = require("../isAuthenticated");
const { getChannel } = require('./Rabbit'); // Import the getChannel function from your RabbitMQ connection file

const buyProduct = async (req, res) => {
  const { ids } = req.body;
  const products = await Product.find({ _id: { $in: ids } });

  const channel = getChannel(); // Retrieve the channel

  channel.sendToQueue(
    "ORDER",
    Buffer.from(
      JSON.stringify({
        products,
        userEmail: req.user.email,
      })
    )
  );

  channel.consume("PRODUCT", (data) => {
    console.log('Consuming Product queue');
    const order = JSON.parse(data.content);
    console.log(order);
    // Process the order or store it as needed
    // You may want to emit an event or send a response back to the client here
  });

  return res.json({ message: 'Order processing initiated' });
};

const createProduct = async (req,res) => {
    const { name, description, price } = req.body;
    const newProduct = new Product({
        name,
        description,
        price,
    });
    newProduct.save();
    return res.json(newProduct);
}

module.exports = { buyProduct, createProduct };
