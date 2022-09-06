import axios from "axios";
import { URL_USER_SVC } from "common/configs";
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from "common/constants";

const useAPICall = () => {
  const loginUser = async (username, password) => {
    const body = { username, password };
    const response = await new Promise((resolve) => {
      console.log(
        `Creating user with username: ${body.username} and password: ${body.password}`,
      );
      setTimeout(() => resolve({ user: username, jwt: "test jwt" }), 3000);
    });
    return response;
  };

  const signUpUser = async (username, password) => {
    const response = await axios
      .post(URL_USER_SVC, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_CONFLICT) {
          console.log("This username already exists");
        } else {
          console.log("Please try again later");
        }
      });
  };

  return {
    loginUser,
    signUpUser,
  };
};

export default useAPICall;
