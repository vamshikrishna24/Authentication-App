const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const User = require("./models/user");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const { v4: genearteUID } = require("uuid");

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));
app.get("/test", (req, res) => {
  res.send("Hello from other side");
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send({ message: "User doesnt exist" });
  const ifUser = await bcrypt.compare(req.body.password, user.HashedPassword);
  if (!ifUser) return res.status(401).send({ message: "Wrong password" });
  user.HashedPassword = undefined;
  return res.send(user);
});

app.post("/signup", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    OrignalPassword: req.body.password,
    HashedPassword: await bcrypt.hash(req.body.password, 10),
    name: req.body.name,
    uid: genearteUID(),
  });
  const user = await newUser.save();
  user.HashedPassword = undefined;
  res.send(user);
});

app.put("/update", async (req, res) => {
  const getUser = await User.findOne({ uid: req.body.uid });
  if (getUser.OrignalPassword != req.body.password) {
    await User.updateOne(
      { uid: req.body.uid },
      {
        $set: {
          ...req.body,
          OrignalPassword: req.body.password,
          HashedPassword: await bcrypt.hash(req.body.password, 10),
        },
      }
    );
    const temp = await User.findOne({ uid: req.body.uid });
    temp.HashedPassword = undefined;
    return res.send(temp);
  }
  await User.updateOne({ uid: req.body.uid }, { $set: { ...req.body } });
  const temp = await User.findOne({ uid: req.body.uid });
  temp.HashedPassword = undefined;
  return res.send(temp);
});

app.listen(process.env.PORT, () => {
  console.log("Listening to port : ", process.env.PORT);
});
