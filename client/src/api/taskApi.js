import axios from "axios";
import { backendBaseUrl } from "../constants";

export const createTask = async (payload) => {
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
      `${backendBaseUrl}/create-task`,
      payload,
      { headers: headers }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

export const getAllTasks = async () => {
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
    const response = await axios.get(`${backendBaseUrl}/all-tasks`, {
      headers: headers,
    });
    return response;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};
export const changeTaskStatus = async (newStatus, taskId) => {
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
    const payload = {
      status: newStatus,
    };
    const response = await axios.patch(
      `${backendBaseUrl}/change-status/${taskId}`,
      payload,
      { headers: headers }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong.");
  }
};
export const changeChecklistItemStatus = async (newStatus, taskId, itemId) => {
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
    const payload = {
      status: newStatus ? "done" : "not",
    };
    const response = await axios.patch(
      `${backendBaseUrl}/mark/${taskId}/${itemId}`,
      payload,
      { headers: headers }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong.");
  }
};

export const getTask = async (taskId) => {
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
    const response = await axios.get(`${backendBaseUrl}/task/${taskId}`, {
      headers: headers,
    });
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong.");
  }
};

export const updateTask = async (payload, taskId) => {
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
    const response = await axios.put(
      `${backendBaseUrl}/update/${taskId}`,
      payload,
      { headers: headers }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};
export const deleteTask = async (taskId) => {
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
    const response = await axios.delete(`${backendBaseUrl}/delete/${taskId}`, {
      headers: headers,
    });
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const getAnalytics = async () => {
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
    const response = await axios.get(`${backendBaseUrl}/analytics`, {
      headers: headers,
    });
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};
