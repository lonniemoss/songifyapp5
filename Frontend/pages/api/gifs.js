import Axios from "axios";
import APIAddress from "../../APIAddress/APIAddress";
export default function handler(req, res) {
  (async () => {
    await Axios.post(APIAddress.APIAddress + "fetchGifs", {
      input: req.body.input,
    })
      .then((response) => {
        res.status(200).json({ message: response.data });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  })();
}
