import { getHistory } from "api";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const useHistory = () => {
  const [pastQuestions, setPastQuestions] = useState([]);
  const [cookies] = useCookies(["token"]);

  const handleQuestionClick = (titleSlug) => {
    // TODO: navigate to the solo page
    console.dir(titleSlug);
  };

  useEffect(() => {
    getHistory(cookies?.username || "")
      .then((res) => {
        const questionDatas = res.data.map((data) => {
          return {
            title: data.title,
            titleSlug: data.titleSlug,
            createdAt: new Date(data.createdAt),
          };
        });

        questionDatas.sort((a, b) => b.createdAt - a.createdAt);

        setPastQuestions(questionDatas);
      })
      .catch((err) =>
        console.log("Something went wrong when getting history", err),
      );
  }, [cookies?.username]);

  return {
    handleQuestionClick,
    pastQuestions,
  };
};

export default useHistory;
