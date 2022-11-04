import { getQuestion, getQuestionFromSlug } from "api";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const useQuestion = (handleOpenNotification, type) => {
  // Feel free to update this to useState
  const [questionObject, setQuestionObject] = useState("Loading question...");

  const [questionName, setQuestionName] = useState("");

  const search = useLocation().search;

  let promiseQuestionObject = null;
  if (type === "collab") {
    const roomId = new URLSearchParams(search).get("roomId");
    promiseQuestionObject = getQuestion(roomId);
  } else {
    const titleSlug = new URLSearchParams(search).get("titleSlug");
    promiseQuestionObject = getQuestionFromSlug(titleSlug);
  }
  promiseQuestionObject
    .then((res) => {
      const { content, title } = res.data;
      setQuestionName(title);
      setQuestionObject(content);
    })
    .catch((error) => {
      handleOpenNotification("Failed to fetch question!", 3000, "error");
    });

  return { questionObject, questionName };
};

export default useQuestion;
