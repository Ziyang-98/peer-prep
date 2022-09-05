import { useState, useRef, useEffect } from "react";

const TIMER_COUNTDOWN = 10;

const useMatching = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const [timer, setTimer] = useState(TIMER_COUNTDOWN);

  let intervalRef = useRef();

  useEffect(() => {
    return () => {
      intervalRef.current = setInterval(performIntervalAction, 1000);

      return () => hardReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // let count = useRef(0);

  const reset = () => {
    setLoading(false);
    clearInterval(intervalRef.current);
  };

  const hardReset = () => {
    setSuccess(false);
    setFailure(false);
    reset();
  };

  const checkForMatch = () => {
    // TODO: Implement logic to check whether there is a match. This function will be called every second during loading
    // if (count.current === 3) {
    //   return true;
    // }
    // count.current++;
    // return false;
  };

  const intervalAction = (timer) => {
    if (timer === 0) {
      setFailure(true);
      reset();
      return TIMER_COUNTDOWN;
    } else {
      const match = checkForMatch();
      if (match) {
        setSuccess(true);
        reset();
        return TIMER_COUNTDOWN;
      } else {
        return timer - 1;
      }
    }
  };

  const performIntervalAction = () => {
    setTimer((timer) => intervalAction(timer));
  };

  const handleMatchButtonClick = () => {
    if (!loading) {
      hardReset();
      setLoading(true);
      intervalRef.current = setInterval(performIntervalAction, 1000);
    }
  };

  return {
    timer,
    success,
    failure,
    loading,
    handleMatchButtonClick,
  };
};

export default useMatching;
