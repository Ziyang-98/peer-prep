// import axios from "axios";

export async function userLogin(username, password) {
  try {
    const response = await new Promise(() => {
      console.log(
        `Creating user with username: ${username} and password: ${password}`,
      );
      return true;
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
