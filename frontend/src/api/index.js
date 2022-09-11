import axios from "axios";
import {
  URL_LOGIN,
  URL_MATCHING_SVC,
  URL_DELETE_USER,
  URL_CHANGE_PASSWORD,
  URL_USER_SVC,
} from "common/configs";
import { STATUS_CODE_CONFLICT } from "common/constants";

export async function loginUser(username, password) {
  const body = { username, password };

  const response = await axios.post(URL_LOGIN, body);
  return response;
}

export async function deleteUser() {
  const body = {};

  const response = await axios.post(URL_DELETE_USER, body, {
    withCredentials: true,
  });
  return response;
}

export async function changePassword(password) {
  const body = { password };

  const response = await axios.post(URL_CHANGE_PASSWORD, body, {
    withCredentials: true,
  });
  return response;
}

export async function signUpUser(username, password) {
  const body = { username, password };

  const response = await axios.post(URL_USER_SVC, body).catch((err) => {
    if (err.response.status === STATUS_CODE_CONFLICT) {
      console.log("This username already exists");
    } else {
      console.log("Please try again later");
    }
  });

  return response;
}

export async function matchUser(username, difficulty) {
  const body = { username, difficulty };

  const response = await axios.post(URL_MATCHING_SVC, body);
  return response;
}

export async function deleteMatch(id) {
  const response = await axios.delete(URL_MATCHING_SVC + `/${id}`);
  return response;
}
