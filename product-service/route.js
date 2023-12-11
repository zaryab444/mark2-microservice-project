const express = require("express");
const router = express.Router();
const isAuthenticated = require("../isAuthenticated");
const {
    buyProduct,
    createProduct
  } = require("./controller");

  router.route("/buy").post(isAuthenticated, buyProduct);
  router.route("/create").post(isAuthenticated, createProduct);

  module.exports = router;
