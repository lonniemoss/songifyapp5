const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const App = express();
const PORT = 4000;

//API modules MusicBrainz
const FetchTitles = require("./API/MusicBrainzAPI/FetchTitles");
const FetchTitleInfo = require("./API/MusicBrainzAPI/FetchTitleInfo");
const FetchCoverArt = require("./API/MusicBrainzAPI/FetchCoverArt");

//API modules Giphy
const FetchGifs = require("./API/GiphyAPI/FetchGifs");

App.use(bodyParser.json());
App.use(cors());

App.get("/", async (req, res) => {
  res.send("Server is UP!");
});

//MusicBrainz APIs
App.post("/fetchTitles", async (req, res) => {
  const FetchTitlesResponse = await FetchTitles.FetchTitlesAPI(req.body.input);
  res.send(FetchTitlesResponse);
});

App.post("/fetchTitleInfo", async (req, res) => {
  if (req.body.input !== undefined || req.body.input !== null) {
    const FetchTitleInfoResponse = await FetchTitleInfo.FetchTitleInfoAPI(
      req.body.input
    );
    console.log(FetchTitleInfoResponse);
    res.status(200);
    res.jsonp(FetchTitleInfoResponse);
  } else {
    res.status(400);
    res.send({ message: "No Body Obtained." });
  }
});

App.post("/fetchCoverArt", async (req, res) => {
  const FetchCoverArtResponse = await FetchCoverArt.FetchCoverArtAPI(
    req.body.input
  );
  res.send(FetchCoverArtResponse);
});

//Giphy APIs
App.post("/fetchGifs", async (req, res) => {
  const FetchGifsResponse = await FetchGifs.FetchGifsAPI(req.body.input);
  res.send(FetchGifsResponse);
});

App.listen(PORT, () => {
  console.log("App is listening on port " + PORT);
});
