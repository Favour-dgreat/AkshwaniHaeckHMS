const express = require("express");
const app = express();
const PORT = process.env.PORT || 4003;
const getOracleResponse = require("./server/get-oracle-response.js");

app.use(express.static("public"));

// ORACLE
require("./src/operator/index.js");

// API
app.get("/api/v1/oracle/:query", async (req, res) => {
  const { query } = req.params;
  let data = await getOracleResponse(query);
  res.status(200).json({ data });
});

app.all("*", (req, res) => {
  res.sendFile("./public/index.html", { root: __dirname });
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
