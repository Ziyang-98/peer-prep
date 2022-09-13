import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "api/index";
import { useCookies } from "react-cookie";

const useLogin = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLoginSuccess = (user, token) => {
    setUser(user);
    setCookie("token", token, { path: "/", maxAge: 300 });
    setCookie("username", user.username, { path: "/", maxAge: 300 });

    navigate("/", { replace: true });
    setLoading(false);
  };

  const handleLogin = async (event) => {
    setLoading(true);
    setIsInvalidLogin(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await loginUser(data.get("username"), data.get("password"))
      .then((res) => {
        const { user, token } = res.data;
        handleLoginSuccess(user, token);
      })
      .catch((error) => {
        setIsInvalidLogin(true);
        console.error(error);
        setLoading(false);
      });
  };

  return {
    handleLogin,
    loading,
    isInvalidLogin,
  };
};

export default useLogin;
