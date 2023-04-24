const API = require("./API");
const axios = require("axios");

async function FetchTitleInfoAPI(titleID) {
  let responseData;
  await axios
    .get(API.TitlesAPI.recording + `${titleID}?inc=artist-credits`, {
      params: {
        ftm: "json",
      },
    })
    .then(function (response) {
      responseData = JSON.parse(JSON.stringify(response.data));
    })
    .catch(function (error) {
      responseData = error;
    });
  await axios
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
