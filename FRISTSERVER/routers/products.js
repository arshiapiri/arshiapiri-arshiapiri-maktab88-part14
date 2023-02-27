const { create } = require("domain");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const products = require("../db/products-data.json");

const template = [
  "id",
  "title",
  "price",
  "rating",
  "stock",
  "brand",
  "category",
]



//create user
router.post("/create-product", function (req, res) {
  const newProduct = req.body

  const createUser = () => {

    let keys = Object.keys(newProduct);
    // validation 
    if (keys.length === 0)  return res.send("data object must not be empty");
    if (keys.length !== template.length) return res.send("length Error");
    if (keys.find((property) => !template.includes(property)))return res.send(`property is not valid`);
    if (typeof newProduct.id !== "number") return res.send("id must be a number");
    if (typeof newProduct.rating !== "number") return res.send("rating must be a number");
    if (typeof newProduct.price !== "number") return res.send("price must be a number");
    if (typeof newProduct.stock !== "number") return res.send("stock must be a number");
    let duplicate = products.find(product => product.id === newProduct.id);
    if (!!duplicate) {
      return res.send("this ID already exists! Please Try Again With Another ID");
    }
    let newData = [...products, newProduct];
    return fs.writeFileSync(path.join(__dirname, "../db/products-data.json"), JSON.stringify(newData));
  }
  createUser()
  res.json(newProduct);
});

//read user

router.get("/get-all-products", function (_req, res) {
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

    if (!product) {
      return res.status(404).send("Not Found!");
  };

   return res.json(product);

  } catch (err) {

    res.status(400).send("something went wrong!")

  }
})

router.put("/update-product/:id", function (req, res) {
  const newProduct = req.body

  const product = products.find(x => x.id == newProduct.id);


  let keys = Object.keys(newProduct);
  if (keys.length === 0) return res.send("data object must not be empty");
  if (newProduct.title) product.title = newProduct.title;
  if (newProduct.id) product.id = newProduct.id;
  if (newProduct.price) product.price = newProduct.price;
  if (newProduct.rating) product.rating = newProduct.rating;
  if (newProduct.stock) product.stock = newProduct.stock;
  if (newProduct.brand) product.brand = newProduct.brand;
  if (newProduct.category) product.category = newProduct.category;;

  if (!product) {
    throw new Error(`Product with this id doesn't exist`);
  }
  if (keys.find((property) => !template.includes(property)))
  throw new Error(`property is not valid`);
  Object.assign(product, newProduct);
  return fs.writeFileSync(path.join(__dirname, "../db/products-data.json"), JSON.stringify(products));
})


module.exports = router;