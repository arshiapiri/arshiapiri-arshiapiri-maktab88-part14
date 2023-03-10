const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const users = require("../db/users-data.json");


// create new product
router.post("/new-user", (req, res) => {
    const newUser = {
        firstname: req.body.firstname,
        lastname :req.body.lastname,
        username :req.body.username,
        password :req.body.password,
        gender :req.body.gender
    };

    users.push(newUser);

    try {
        fs.writeFileSync(path.join(__dirname, "../db/users-data.json"), JSON.stringify(users));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };

    res.json(newUser);
});


// read products
router.get("/get-all-users", (req, res) => {

    return res.json(users);
});



//read single product
router.get("/get-user/:username", (req, res) => {

    const user = users.find(x => x.username == req.params.username);

    if (!user) {
        return res.status(404).send("Not Found!");
    };

    return res.json(user);
});


// remove product
router.delete("/remove-user/:username", (req, res) => {

    const userTemp = users.filter(x => x.username != req.params.username);

    try {
        fs.writeFileSync(path.join(__dirname, "../db/users-data.json"), JSON.stringify(userTemp));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };


    res.send("remove user");
});
module.exports = router;