import { useState, useRef, useEffect } from "react";
import { matchUser } from "api";
import { URI_MATCHING_SVC } from "common/configs";
import io from "socket.io-client";

const TIMER_COUNTDOWN = 30;

const useMatching = ({ title }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(TIMER_COUNTDOWN);

  let intervalRef = useRef();

  const stopLoading = () => {
    setLoading(false);
    clearInterval(intervalRef.current);
  };

  const hardReset = () => {
    setSuccess(false);
    setFailure(false);
    setError(false);
    stopLoading();
  };

  useEffect(() => {
    return () => {
      intervalRef.current = setInterval(performIntervalAction, 1000);

      return () => hardReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSuccess = () => {
    setSuccess(true);
    stopLoading();
  };

  const handleFailure = () => {
    // Add delete match with id
    setFailure(true);
    stopLoading();
  };

  const intervalAction = (timer) => {
    if (timer === 0) {
      handleFailure();
      return TIMER_COUNTDOWN;
    }
    return timer - 1;
  };

  const performIntervalAction = () => {
    setTimer((timer) => intervalAction(timer));
  };

  // Socket Functions

  const emitMatchFound = (socket, room) => {
    socket.emit("matchFound", { room });
  };

  const emitMatchWaiting = (socket, room) => {
    socket.emit("matchWaiting", { room });

    socket.on("room", ({ room }) => {
      console.log("Match found while matching: ", room);
      handleSuccess();
    });

    socket.on("failToMatch", ({ msg }) => {
      console.log("No Match found ", msg);
      handleFailure();
    });
  };

  const handleMatchButtonClick = () => {
    // TODO: Change to get user from cookie/localStorage
    const user = "user" + Math.random(100);
    const difficulty = title;
    if (!loading) {
      hardReset();
      setLoading(true);
      intervalRef.current = setInterval(performIntervalAction, 1000);

      matchUser(user, difficulty)
        .then((res) => {
          const { isMatch, room } = res.data;
          const socket = io.connect(URI_MATCHING_SVC);

          if (isMatch) {
            emitMatchFound(socket, room);
            handleSuccess();
          } else {
            emitMatchWaiting(socket, room);
          }
        })
        .catch((error) => {
          console.error(error);
          setError(true);
          stopLoading();
        });
    }
  };

  return {
    timer,
    success,
    failure,
    loading,
    error,
    handleMatchButtonClick,
  };
};

export default useMatching;
