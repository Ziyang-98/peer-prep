import axios from "axios";
import {
  URL_LOGIN,
  URL_MATCHING_SVC,
  URL_DELETE_USER,
  URL_CHANGE_PASSWORD,
  URL_USER_SVC,
  URL_QUESTION_SVC,
} from "common/configs";

export async function loginUser(username, password) {
  const body = { username, password };
  

  const response = await axios.post(URL_LOGIN, body);
  return response;
}

export async function deleteUser(cookies) {
  const body = {};
  console.log(cookies['token']);

  const response = await axios.post(URL_DELETE_USER, body, {
    headers: {
      'Authorization': "Bearer " + cookies['token']
    }
  });
  return response;
}

export async function changePassword(cookies, password) {
  const body = { password };

  const response = await axios.post(URL_CHANGE_PASSWORD, body, {
    headers: {
      'Authorization': "Bearer " + cookies['token']
    }
  });
  return response;
}

export async function signUpUser(username, password) {
  const body = { username, password };

  const response = await axios.post(URL_USER_SVC, body);

  return response;
}

export async function matchUser(user, difficulty) {
  const body = { user, difficulty };

  const response = await axios.post(URL_MATCHING_SVC, body);
  return response;
}

export async function deleteMatch(id) {
  const response = await axios.delete(URL_MATCHING_SVC + `/${id}`);
  return response;
}

export async function getQuestion(roomId) {
  const response = await axios.get(URL_QUESTION_SVC + `/${roomId}`);
  return response;
}
