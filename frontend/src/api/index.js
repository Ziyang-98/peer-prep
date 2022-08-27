// import axios from "axios";

export async function loginUser(username, password) {
  const body = { username, password };
  const response = await new Promise((resolve) => {
    console.log(
      `Creating user with username: ${body.username} and password: ${body.password}`,
    );
    setTimeout(() => resolve({ user: username, jwt: "test jwt" }), 3000);
  });
  return response;
}
