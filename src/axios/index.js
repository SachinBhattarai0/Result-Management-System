const axios = require("axios");
export const baseURL = "http://localhost:8000/api";

export const api = axios.create({
  baseURL,
});

export const apiWithJwt = async (url, data, jwt) => {
  return await axios.post(baseURL + url, data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
};
