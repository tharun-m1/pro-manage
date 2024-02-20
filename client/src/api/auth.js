import axios from "axios";
import { backendBaseUrl } from "../constants.js";
export const register = async (payload) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/signup`, payload);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response && err.response.status === 409) {
      const error = new Error("User already exists.");
      error.status = 409;
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export const login = async (payload) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/login`, payload);
    return response;
  } catch (err) {
    const error = new Error();
    if (err.response.status === 404) {
      error.message = err.response.data.message;
      err.status = 404;
      throw error;
    } else if (err.response.status === 401) {
      error.status = 401;
      error.message = err.response.data.message;
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export const verify = async () => {
  try {
    const jwToken = localStorage.getItem("jwToken");
    if (!jwToken) {
      const error = new Error();
      error.status = 500;
      error.message = "You are not LoggedIn";
      throw new error();
    }
    const headers = {
      "Content-Type": "application/json",
      authorization: jwToken,
    };
    const response = await axios.post(
      `${backendBaseUrl}/verify`,
      {},
      { headers: headers }
    );
    return response;
  } catch (err) {
    console.log(err);
    const error = new Error();
    error.status = 500;
    error.message = "You are not LoggedIn";
    throw new error();
  }
};
