import axios from "axios";

export const handleError = (err) => {
  console.error(err);
};

class ApiClient {
  constructor() {
    this.apiClient = null;
    this.apiUrl = process.env.REACT_APP_API_URL ?? "";
  }

  init = () => {
    if (this.apiUrl.length === 0) {
      console.error("api url undefined");
      return;
    }

    const headers = {
      "content-type": "application/json",
    };

    this.apiClient = axios.create({
      baseURL: this.apiUrl + "/",
      timeout: 30000, //timeout 30sec
      headers: headers,
    });

    return this.apiClient;
  };
}
export default class Api extends ApiClient {
  getYarns = async (params) => {
    try {
      const results = await this.init()?.get("yarns", { params });
      return results.data;
    } catch (err) {
      handleError(err);
      return null;
    }
  };

  getBrands = async () => {
    try {
      const results = await this.init()?.get("brands");
      return results.data;
    } catch (err) {
      handleError(err);
      return null;
    }
  };

  getMaterials = async () => {
    try {
      const results = await this.init()?.get("materials");
      return results.data;
    } catch (err) {
      handleError(err);
      return null;
    }
  };
}
