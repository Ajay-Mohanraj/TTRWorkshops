const express = require("express");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://TTR_Hackathon:FuDKszE6p27lygOY@hackathondb.ertbk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("HackathonDB").collection("devices");
  const res = collection.insertOne({ test: "callcalllcall" });
  console.log(res);

  //   client.close();
});

const app = express();

app.post("/registration/participants", async (req, res) => {
  // Insert data into mongodb
  // Req body is a json like {q1: ..., q2:... ... }
});

app.post("/registration/speakers", async (req, res) => {});

app.post("/registration/mentors", async (req, res) => {});

app.post("/registration/judges", async (req, res) => {});

app.post("/evaluation", async (req, res) => {});
