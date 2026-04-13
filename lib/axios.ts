import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.kambista.com/v1",
  timeout: 10000,
});
