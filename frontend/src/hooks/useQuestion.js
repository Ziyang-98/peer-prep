import { getQuestion } from "api";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const useQuestion = (handleOpenNotification) => {
  // Feel free to update this to useState
  const [questionObject, setQuestionObject] = useState("Loading question...");

  const [questionName, setQuestionName] = useState("");

  const search = useLocation().search;
  const roomId = new URLSearchParams(search).get("roomId");

  getQuestion(roomId)
    .then((res) => {
      const { content, title } = res.data;
      setQuestionName(title);
      setQuestionObject(content);
    })
    .catch((error) => {
      handleOpenNotification("Failed to fetch question!", 3000, "error");
    });

  // TODO: Add logic to get question from backend and return question info

  // Note: Can use handleOpenNotification to notify user in small popup if theres issues getting question from backend
  // handleOpenNotification(message, timeoutTime, type)
  // - message: Message to show user
  // - timeoutTime: time popup takes to exit in ms
  // - type: type of notification ("success" || "error")
  // Example usage: handleOpenNotification("Encounter issues retriveing questions!", 4000, "error")

  return { questionObject, questionName };
};

export default useQuestion;
