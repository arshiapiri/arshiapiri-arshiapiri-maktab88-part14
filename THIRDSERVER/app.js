const express = require("express");
const app = express();
const signupRouter = require("./routers/signUp")
const path = require("path");
app.use(express.static("public"));


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/auth",signupRouter)


app.listen(5000)