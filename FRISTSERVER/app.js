const express = require("express");
const app = express();

const productsRoutes = require("./routers/products.js")

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use("/product",productsRoutes)

app.listen(5000)