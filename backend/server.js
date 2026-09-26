const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();

const PORT = 5000;

app.use(express.json());

//Route
app.get("/api/health", (req, res) => {
  res.send("SafeCircle Application......");
});

//Database connection.
const DB = process.env.DATABASE_CONNECTION_STR.replace(
  "<PASSWORD>",
  process.env.PASSWORD,
);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connection is Successful....");
  })
  .catch((err) => {
    console.log(`Database connection Failed \n Error: ${err.message}`);
  });

//my server
app.listen(PORT, () => {
  console.log(`SafeCircle running on port ${PORT}.`);
});
