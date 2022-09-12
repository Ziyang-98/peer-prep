import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "api/index";
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from "common/constants";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [isSignupFailure, setIsSignupFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSignUpSuccess = (user, password) => {
    console.log("Signed Up!");
    console.log(`User: ${user}, Password: ${password}`);
    setIsSignupSuccess(true);
    navigate("#", { replace: true });
    setLoading(false);
  };

  const handleSignUp = async (event) => {
    setLoading(true);
    setIsSignupFailure(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await signUpUser(data.get("username"), data.get("password"))
      .then((response) => {
        if (response.status === STATUS_CODE_CREATED) {
          handleSignUpSuccess(data.get("username"), data.get("password"));
        }
      })
      .catch((error) => {
        if (error.response.status === STATUS_CODE_CONFLICT) {
          console.error(error);
          setIsSignupFailure(true);
          setErrorMessage(error.response.data.message);
          setLoading(false);
        } else {
          console.error(error);
          console.log("Check whether user service is running");
          setIsSignupFailure(true);
          setErrorMessage("Backend is not running!");
          setLoading(false);
        }
      });
  };

  return {
    handleSignUp,
    loading,
    isSignupFailure,
    errorMessage,
    isSignupSuccess,
  };
};

export default useSignUp;
