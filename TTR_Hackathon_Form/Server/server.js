const express = require("express");
const { MongoClient } = require("mongodb");
const parser = require("body-parser");

// Next phase:
// 1.Security
// 2. Sign in page + private view displaying participants
// 3. Test DB performance
const uri =
  "mongodb+srv://TTR_Hackathon:FuDKszE6p27lygOY@hackathondb.ertbk.mongodb.net/?retryWrites=true&w=majority";
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

app.post("/registration/participants", async (req, res) => {
  // Insert data into mongodb
  // Req body is a json like {q1: ..., q2:... ... }
  try {
    const collection = client.db("HackathonDB").collection("Participants");
    collection.createIndex({ Email: 1 }, { unique: true });
    const res = await collection.insertOne(req.body);
    console.log(res);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", msg: "Duplicated email" });
    } else return res.json({ status: "error", msg: "Network error" });
  }
  res.json({ status: "success", msg: "Insert entry success" });
});

app.post("/registration/speakers", async (req, res) => {
  try {
    const collection = client.db("HackathonDB").collection("Speakers");
    collection.createIndex({ Email: 1 }, { unique: true });
    const res = await collection.insertOne(req.body);
    console.log(res);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", msg: "Duplicated email" });
    } else return res.json({ status: "error", msg: "Network error" });
  }
  res.json({ status: "success", msg: "Insert entry success" });
});

app.post("/registration/mentors", async (req, res) => {
  try {
    const collection = client.db("HackathonDB").collection("Mentors");
    collection.createIndex({ Email: 1 }, { unique: true });
    const res = await collection.insertOne(req.body);
    console.log(res);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", msg: "Duplicated email" });
    } else return res.json({ status: "error", msg: "Network error" });
  }
  res.json({ status: "success", msg: "Insert entry success" });
});

app.post("/registration/judges", async (req, res) => {
  try {
    const collection = client.db("HackathonDB").collection("Judges");
    collection.createIndex({ Email: 1 }, { unique: true });
    const res = await collection.insertOne(req.body);
    console.log(res);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", msg: "Duplicated email" });
    } else return res.json({ status: "error", msg: "Network error" });
  }
  res.json({ status: "success", msg: "Insert entry success" });
});

app.post("/evaluations", async (req, res) => {
  try {
    const collection = client.db("HackathonDB").collection("Evaluations");
    collection.createIndex({ Email: 1, Product_URL: 1 }, { unique: true });
    const res = await collection.insertOne(req.body);
    console.log(res);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ status: "error", msg: "Duplicated evaluation" });
    } else return res.json({ status: "error", msg: "Network error" });
  }
  res.json({ status: "success", msg: "Insert entry success" });
});

app.listen(3000, () => {
  console.log("Server listening to 3000");
});
