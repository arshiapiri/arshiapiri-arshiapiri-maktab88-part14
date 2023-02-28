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

  const validation = () => {

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
  validation()
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
  if(newProduct.id != req.params.id) return res.status(500).send("your ID cant Change");
  let keys = Object.keys(newProduct);
  if (keys.length === 0) return res.send("data object must not be empty");
  let values = Object.values(newProduct);
  console.log(values);
  if (values.some((value) => value === "")) return res.send("value of property must not be empty");
  if (keys.find((property) => !template.includes(property))) return res.send("property is not valid")
  res.send(Object.assign(product, newProduct))
  return fs.writeFileSync(path.join(__dirname, "../db/products-data.json"), JSON.stringify(products));

})


module.exports = router;