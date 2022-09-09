import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "api/index";
import { STATUS_CODE_CREATED } from "common/constants";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [isSignupFailure, setIsSignupFailure] = useState(false);

  const navigate = useNavigate();

  const handleSignUpSuccess = (user, password) => {
    console.log("Signed Up!");
    console.log(`User: ${user}, Password: ${password}`);
    navigate("#", { replace: true });
    setLoading(false);
  };

  const handleSignUp = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await signUpUser(data.get("username"), data.get("password")).then(
      (response) => {
        if (response.status === STATUS_CODE_CREATED) {
          handleSignUpSuccess(data.get("username"), data.get("password"));
        } else {
          setIsSignupFailure(true);
          navigate("#", { replace: true });
          setLoading(false);
        }
      },
    );

    // await signUpUser(data.get("username"), data.get("password")).catch(
    //   (error) => {
    //     setIsSignupSuccess(false);
    //     console.error(error);
    //   },
    // );
  };

  return {
    handleSignUp,
    loading,
    isSignupFailure,
  };
};

export default useSignUp;
