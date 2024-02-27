import axios from "axios";
import { backendBaseUrl } from "../constants";

export const updateUser = async (payload) => {
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
    const response = await axios.patch(`${backendBaseUrl}/update`, payload, {
      headers: headers,
    });
    return response;
  } catch (err) {
    console.log(err);
    const error = new Error();
    if (err.response.status === 401) {
      error.status = 401;
      error.message = "Incorrect Password";
      throw error;
    }
    if (err.response.status === 404) {
      error.status = 404;
      error.message = "User not found";
      throw error;
    }
    throw new error();
  }
};
