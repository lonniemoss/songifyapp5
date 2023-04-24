const API = require("./API");
const axios = require("axios");

async function FetchTitlesAPI(request) {
  let ReleaseResponseData;
  let RecordingResponseData;
  await axios
    .get(API.TitlesAPI.release, {
      params: {
        query: request,
        ftm: "json",
        limit: 100,
      },
    })
    .then(function (response) {
      ReleaseResponseData = JSON.parse(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  await axios
    .get(API.TitlesAPI.recording, {
      params: {
        query: request,
        ftm: "json",
        limit: 100,
      },
    })
    .then(function (response) {
      RecordingResponseData = JSON.parse(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  return { ReleaseResponseData, RecordingResponseData };
}

module.exports = { FetchTitlesAPI };
