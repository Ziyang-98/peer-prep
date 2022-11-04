import { getHistory } from "api";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const handleQuestionClick = (titleSlug) => {
    // TODO: navigate to the solo page
    navigate(`/soloRoom?titleSlug=${titleSlug}`);
  };

  getHistory(cookies?.username || "")
    .then((res) => {
      const questionDatas = res.data.map((data) => {
        return {
          title: data.title,
          titleSlug: data.titleSlug,
          createdAt: data.createdAt,
        };
      });

      questionDatas.sort((a, b) => b.createdAt - a.createdAt);

      setHistory(questionDatas);
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
