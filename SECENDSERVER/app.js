const express = require("express");
const app = express();

const productsRoutes = require("./routers/products")
const path = require("path")

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use("/product", productsRoutes);

app.get("/products-page", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/products-page.html"))
});

app.listen(5000)