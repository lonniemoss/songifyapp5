const API = require("./API");
const axios = require("axios");

async function FetchGifsAPI(title) {
  let responseData;
  await axios
    .get(API.APIAddress, {
      params: { api_key: API.API, q: title },
    })
    .then(function (response) {
      responseData = JSON.parse(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  return responseData;
}

module.exports = { FetchGifsAPI };
