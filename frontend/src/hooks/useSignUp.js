import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAPICall from "api/index";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(true);
  const { signUpUser } = useAPICall();

  const navigate = useNavigate();

  const handleSignUpSuccess = (user, jwt) => {
    console.log("Signed Up!");
    console.log(`User: ${user}, JWT: ${jwt}`);
    // TODO: set JWT to cookie
    navigate("#", { replace: true });
    setLoading(false);
  };

  const handleSignup = async (event) => {
    setLoading(true);
    setIsSignupSuccess(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await signUpUser(data.get("username"), data.get("password")).catch(
      (error) => {
        setIsSignupSuccess(false);
        console.error(error);
      },
    );
  };

  return {
    handleSignup,
    loading,
    isSignupSuccess,
  };
};

export default useSignUp;
