import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "api/index";
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from "common/constants";

const useLogin = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLoginSuccess = (user, jwt) => {
    console.log("Logged in!");
    console.log(`User: ${user}, JWT: ${jwt}`);
    setUser(user);
    // TODO: set JWT to cookie
    
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
      });
  };

  return {
    handleLogin,
    loading,
    isInvalidLogin,
  };
};

export default useLogin;
