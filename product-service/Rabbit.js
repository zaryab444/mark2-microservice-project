// rabbitmq.js
const amqp = require("amqplib");
let channel, connection;

const connect = async () => {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("PRODUCT");
};

const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel not established. Call connect() first.");
  }
  return channel;
};

module.exports = { connect, getChannel };
