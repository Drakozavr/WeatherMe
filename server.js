if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//setup server
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${WEATHER_API_KEY}&units=auto`;
  console.log("url:", url);
  axios({
    url: url,
    responseType: "json",
  })
    .then(
      (result) => {
        //const result = data.json();
        console.info("result:", result);
        res.send(JSON.stringify(result.data));
      },
      (reason) => console.error("/weather:rejected")
    )
    .catch((error) => console.error("/weather:error", error));
});

app.listen(3000, () => {
  console.log("Server Started");
});
