import axios from "axios";
import config from "./config";

const request = axios.create({
  baseURL: config.API_URL,
});

export default request;
