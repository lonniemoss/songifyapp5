const API = require("./API");
const axios = require("axios");

async function FetchTitleInfoAPI(titleID) {
  let responseData;
  
    .get(API.TitlesAPI.release + `${titleID}?inc=artist-credits+labels`, {
      params: {
        ftm: "json",
      },
    })
    .then(function (response) {
      responseData = JSON.parse(JSON.stringify(response.data));
    })
    .catch((Err) => {});
  return responseData;
}

module.exports = { FetchTitleInfoAPI };
