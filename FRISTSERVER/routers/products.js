const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const products = require("../db/products-data.json");



//create user
router.post("/create-product", function (req, res) {

  const newProduct = {
    "id": req.body.id,
    "title": req.body.title,
    "price": req.body.price,
    "rating": req.body.rating,
    "stock": req.body.stock,
    "brand": req.body.brand,
    "category": req.body.category
  }
  products.push(newProduct);
  
  try {
    fs.writeFileSync(path.join(__dirname, "../db/products-data.json"), JSON.stringify(products));
  } catch (err) {
    console.log(err);
    return res.status(400).send("Try again later!")
  };

  res.json(newProduct);
});
//read user
router.get("/get-all-products", function (req, res) {
  try {
    res.json(products);

  } catch (err) {

    res.status(400).send("something went wrong!")

  }
})
// read user with id
router.get("/get-product/:id", function (req, res) {
  try {

    const product = products.find(x => x.id == req.params.id)

    res.json(product);

  } catch (err) {

    res.status(400).send("something went wrong!")

  }
})

router.put("/update-product/id", function (req, res) {

  const product = products.find(x => x.id == req.params.id)

})


module.exports = router;