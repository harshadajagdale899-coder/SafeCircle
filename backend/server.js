const express = require("express");

const app = express();

const PORT = 5000;

//Route
app.get("/api/health", (req, res) => {
  res.send("SafeCircle Application......");
});

//my server
app.listen(PORT, () => {
  console.log(`SafeCircle running on port ${PORT}.`);
});
