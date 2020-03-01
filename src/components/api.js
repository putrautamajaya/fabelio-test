import axios from "axios";

const API = {
  async getFurniture() {
    let response = undefined;

    try {
      response = await axios.get(
        "https://www.mocky.io/v2/5c9105cb330000112b649af8"
      );
    } catch (error) {
      console.log("Error while getting furniture", error);
      return error;
    }

    return response.data;
  }
};

export default API;
