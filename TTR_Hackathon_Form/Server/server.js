require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const parser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const { emit } = require("process");

const SECRET = process.env.SECRET;

// Next phase:
// 1.Security
// 2. Sign in page + private view displaying participants
// 3. Test DB performance
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

try {
  client.connect();
} catch (err) {
  console.log(err);
}

// const collection = client.db("HackathonDB").collection("devices");
// const res = collection.insertOne({ test: "callcalllcal" });
// console.log(res);

const app = express();
app.use(parser.json());
app.set("view engine", "ejs");
app.use("/", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));

// DB Display
app.get("/", (req, res) => {
  const collection = client.db("HackathonDB").collection("Participants");
  collection.find().toArray((err, docs) => {
    res.render("DbDisplay/db_display", {
      lst: docs,
    });
  });
});

// Participant Form
app.post("/registration/participants", async (req, res) => {
  // Insert data into mongodb
  // Req body is a json like {q1: ..., q2:... ... }
  try {
    const collection = client.db("HackathonDB").collection("Participants");
    // collection.createIndex({ Email: 1 }, { unique: true });
    const result = await collection.insertOne(req.body);
    console.log(result);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", msg: "Duplicated email" });
    } else return res.json({ status: "error", msg: "Network error" });
  }
  res.json({ status: "success", msg: "Insert entry success" });
});

// Speaker Form
app.post("/registration/speakers", async (req, res) => {
  try {
    const collection = client.db("HackathonDB").collection("Speakers");
    // collection.createIndex({ Email: 1 }, { unique: true });
    const result = await collection.insertOne(req.body);
    console.log(result);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", msg: "Duplicated email" });
    } else return res.json({ status: "error", msg: "Network error" });
  }
  res.json({ status: "success", msg: "Insert entry success" });
});

// Mentor Form
app.post("/registration/mentors", async (req, res) => {
  try {
    const collection = client.db("HackathonDB").collection("Mentors");
    // collection.createIndex({ Email: 1 }, { unique: true });
    const result = await collection.insertOne(req.body);
    console.log(result);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", msg: "Duplicated email" });
    } else return res.json({ status: "error", msg: "Network error" });
  }
  res.json({ status: "success", msg: "Insert entry success" });
});

// Judge Form
app.post("/registration/judges", async (req, res) => {
  try {
    const collection = client.db("HackathonDB").collection("Judges");
    // collection.createIndex({ Email: 1 }, { unique: true });
    const result = await collection.insertOne(req.body);
    console.log(result);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", msg: "Duplicated email" });
    } else return res.json({ status: "error", msg: "Network error" });
  }
  res.json({ status: "success", msg: "Insert entry success" });
});

// Evaluation Form
app.post("/evaluations", async (req, res) => {
  try {
    const collection = client.db("HackathonDB").collection("Evaluations");
    // collection.createIndex({ Email: 1, Product_URL: 1 }, { unique: true });
    const res = await collection.insertOne(req.body);
    console.log(res);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", msg: "Duplicated evaluation" });
    } else return res.json({ status: "error", msg: "Network error" });
  }
  res.json({ status: "success", msg: "Insert entry success" });
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
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
    const collection = client.db("HackathonDB").collection("Admin");
    const result = await collection.insertOne({
      Username: username,
      Email: email,
      Password: encrypt,
    });
    console.log(result);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", error: "Duplicated email" });
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
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password)
    return res.json({ status: "error", error: "Invalid entries" });

  const collection = client.db("HackathonDB").collection("Admin");
  const u = await collection.findOne({ Username: username });
  if (!u) return res.json({ status: "error", error: "User not found" });
  console.log(u);
  if (await bcrypt.compare(password, u.Password)) {
    const token = jwt.sign(
      {
        username: u.username,
        email: u.email,
      },
      SECRET
    );
    return res.json({ status: "success", data: token });
  } else {
    return res.json({ status: "error", error: "Incorrect password" });
  }
});

// Start listening to Port 3000
app.listen(3000, () => {
  console.log("Server listening to 3000");
});
