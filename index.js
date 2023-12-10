var express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const Auth = Buffer.from(
  process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET
).toString("base64");

var corsOptions = {
  // origin: "http://localhost:8081"
};

var app = express();
app.use(cors(corsOptions));

// var PORT = 4193;
var PORT = process.env.PORT || 4193;

app.get("/gasEstimate/", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://gas.api.infura.io/networks/1/suggestedGasFees`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      }
    );
    return res.send(data);
  } catch (e) {
    console.log(e);
    return res.send({});
  }
});
app.listen(PORT, function () {
  console.log("Server is running on PORT:", PORT);
});
