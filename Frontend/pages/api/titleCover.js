import Axios from "axios";
import APIAddress from "../../APIAddress/APIAddress";

export default async function handler(req, res) {
  await Axios.post(APIAddress.APIAddress + "fetchCoverArt", {
    input: req.body.input,
  })
    .then((response) => {
      res.status(200).json({ message: response.data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
}
