const express = require("express");
const path = require("path");
const parser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "njndcj;o(*!#IUHui2h1oih(H!(Hib32beib9!(bjbsjincj+_=fsjkfij2";
mongoose.connect(
  "mongodb+srv://SunnyStardust:DvMq1Vlo7d4BoSu8@testcluster.zoxxt.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const app = express();
app.use("/", express.static(path.join(__dirname, "public")));
app.use(parser.json());

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, pwd: password } = req.body;
  console.log(username, password);
  // fields check
  if (!username || !email || !password)
    return res.json({ status: "error", error: "Invalid entries" });
  if (password.length < 6)
    return res.json({ status: "error", error: "Password too short" });

  // Encryption
  const encrypt = await bcrypt.hash(password, 10);

  // Save to db
  try {
    const entry = await user.create({ username, email, password: encrypt });
    console.log(entry);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", error: "Duplicated username" });
    }
    return res.json({ status: "error" });
  }

  const token = jwt.sign(
    {
      username: username,
      email: email,
    },
    SECRET
  );
  res.json({ status: "ok", data: token });
});

app.post("/login", async (req, res) => {
  const { username, pwd } = req.body;
  console.log(username, pwd);

  if (!username || !pwd)
    return res.json({ status: "error", error: "Invalid entries" });

  // Find the corresponding user
  const u = await user.findOne({ username }).lean();
  if (!u) return res.json({ status: "error", error: "User not found" });
  if (await bcrypt.compare(pwd, u.password)) {
    const token = jwt.sign(
      {
        username: u.username,
        email: user.email,
      },
      SECRET
    );
    return res.json({ status: "ok", data: token });
  } else {
    return res.json({ status: "error", error: "Incorrect password" });
  }
});

app.listen(3000, () => {
  console.log("Server listening to 3000");
});
