const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs")

const UserData = require("../db/users-data.json");


router.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname,"../views/index.html"));
})

module.exports = router;