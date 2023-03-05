const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));
const userRouter = require("./routers/admin");
const fs = require("fs/promises")
const _ = require("lodash");

const UserData = require("./db/users-data.json");

app.use(express.json());
app.use(express.urlencoded({extended: true}))


//sign up
app.post("/auth/signup",  async (req, res) => {
    const data = req.body

    const isDuplicateId = _.some(UserData, [
        "username",
        data.username
      ]);
      if (!!isDuplicateId) {
        return res.status(400).send("User with given id already exists");
      }
      
      const newUser = {
        fristname: req.body.fristname,
        lastname: req.body.lastname,
        password: req.body.password,
        username: req.body.username,
        gender: req.body.gender,
      };
      UserData.push(newUser);
      try{
        await fs.writeFile("./db/users-data.json", JSON.stringify(UserData))
        res.send("new user created sucessfully")
      }
      catch (err) {
        return res.status(500).send("something is wrong!");
      }
})

app.get("/auth/signup", function (req, res) {
    res.sendFile(path.join(__dirname,"./views/signUp.html"));
})


//log in 
app.get("/auth/login", function (req, res) {
  res.sendFile(path.join(__dirname,"./views/login.html"));
})

app.post("/auth/login", function (req, res) {
  let newperson = req.body.username;
  let findUsername = UserData.find((x) => x.username == newperson);
  let findpassword = UserData.find((x) => x.password == req.body.password);
  if ((!findUsername, !findpassword)) return res.send("erooooooore!");
  else res.send("ok");
})

app.use("/admin", userRouter);

app.get("/admin/panel", (req,res) => {
  res.sendFile(path.join(__dirname, "./views/admin-panel.html"))
})

app.listen(5000)