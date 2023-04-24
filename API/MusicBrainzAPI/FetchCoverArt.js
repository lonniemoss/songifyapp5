const API = require("./API");
const axios = require("axios");

async function FetchCoverArtAPI(releaseID) {
  let responseData;
  await axios
    .get(API.CoverArtAPI + "release/" + releaseID)
    .then(function (response) {
      responseData = JSON.parse(JSON.stringify(response.data));
    })
    .catch(function (error) {
      responseData = "Not Found!";
    });
  return responseData;
}

module.exports = { FetchCoverArtAPI };
