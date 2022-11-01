import { getHistory } from "api";
import { useState } from "react";
import { useCookies } from "react-cookie";

const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [cookies] = useCookies(["token"]);

  const handleQuestionClick = (titleSlug) => {
    console.dir(titleSlug);
  };

  getHistory(cookies?.username || "")
    .then((res) => {
      const questionDatas = res.data;

      setHistory(
        questionDatas.map((questionData) => {
          const { title, titleSlug } = questionData;

          return { title, titleSlug };
        }),
      );
    })
    .catch((err) =>
      console.log("Something went wrong when getting history", err),
    );

  return {
    handleQuestionClick,
    history,
  };
};

export default useHistory;
