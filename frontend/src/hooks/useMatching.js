import { useState, useRef, useEffect } from "react";
import { matchUser, deleteMatch } from "api";
import { URI_MATCHING_SVC } from "common/configs";
import io from "socket.io-client";

const TIMER_COUNTDOWN = 30;

const useMatching = ({ title }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(TIMER_COUNTDOWN);

  const [socket, setSocket] = useState(null);

  let intervalRef = useRef();

  const stopLoading = () => {
    setLoading(false);
    clearInterval(intervalRef.current);
  };

  const hardReset = () => {
    stopLoading();
    setSuccess(false);
    setFailure(false);
    setError(false);
    setTimer(TIMER_COUNTDOWN);
    setSocket(null);
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
    // TODO: Redirect user to collab page
  };

  const handleFailure = () => {
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

  const emitMatchWaiting = (socket, room, matchId) => {
    socket.emit("matchWaiting", { room });

    socket.on("room", ({ room }) => {
      console.log("Match found while matching: ", room);
      handleSuccess();
    });

    socket.on("failToMatch", ({ msg }) => {
      console.log("No Match found ", msg);
      deleteMatch(matchId);
    });
  };

  const handleDisconnect = async () => {
    socket?.disconnect();
    // Set timeout for smoother transition when user closes dialog
    setTimeout(hardReset, 200);
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
          const { id, room, isMatch } = res.data;
          const socket = io.connect(URI_MATCHING_SVC);
          setSocket(socket);

          if (isMatch) {
            emitMatchFound(socket, room);
            handleSuccess();
          } else {
            emitMatchWaiting(socket, room, id);
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
    handleDisconnect,
  };
};

export default useMatching;
