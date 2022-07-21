const express = require("express");
const { MongoClient } = require("mongodb");
const parser = require("body-parser");
const uri =
  "mongodb+srv://TTR_Hackathon:FuDKszE6p27lygOY@hackathondb.ertbk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// client.connect(async (err) => {
//   const collection = client.db("HackathonDB").collection("devices");
//   const res = await collection.insertOne({ test: "callcalllcall" });
//   console.log(res);

//   //   client.close();
// });

const app = express();
app.use(parser.json());

app.post("/registration/participants", async (req, res) => {
  console.log(req.body);

  // Insert data into mongodb
  // Req body is a json like {q1: ..., q2:... ... }
  client.connect(async (err) => {
    const collection = client.db("HackathonDB").collection("Participants");
    const res = await collection.insertOne(req.body);
    console.log(res);
  });
});

app.post("/registration/speakers", async (req, res) => {
  client.connect(async (err) => {
    const collection = client.db("HackathonDB").collection("Speakers");
    const res = await collection.insertOne(req.body);
    console.log(res);
  });
});

app.post("/registration/mentors", async (req, res) => {
  client.connect(async (err) => {
    const collection = client.db("HackathonDB").collection("Mentors");
    const res = await collection.insertOne(req.body);
    console.log(res);
  });
});

app.post("/registration/judges", async (req, res) => {
  client.connect(async (err) => {
    const collection = client.db("HackathonDB").collection("Judges");
    const res = await collection.insertOne(req.body);
    console.log(res);
  });
});

app.post("/evaluation", async (req, res) => {
  client.connect(async (err) => {
    const collection = client.db("HackathonDB").collection("Evaluations");
    const res = await collection.insertOne(req.body);
    console.log(res);
  });
});

app.listen(3000, () => {
  console.log("Server listening to 3000");
});
