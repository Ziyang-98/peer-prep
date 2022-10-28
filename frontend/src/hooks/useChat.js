import { useState, useEffect } from "react";
import io from "socket.io-client";
import { URI_COMMUNICATION_SVC } from "common/configs";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const useChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMessage] = useState("");
  const [noOfNewMessages, setNoOfNewMessages] = useState(0);

  const [socket, setSocket] = useState(null);
  const [cookies] = useCookies(["token"]);

  const search = useLocation().search;
  const roomId = new URLSearchParams(search).get("roomId");
  const username = cookies.username;

  useEffect(() => {
    const socket = io.connect(URI_COMMUNICATION_SVC);
    setSocket(socket);

    socket.on("connect", function () {
      if (username) {
        socket.emit("joinRoom", { username, roomId });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (msgObj) => {
        handleReceiveMessage(msgObj);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, socket]);

  useEffect(() => {
    if (messages.length !== 0 && !isChatOpen) {
      // For MUI badge notification
      incrementNoOfNewMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const resetNoOfNewMessages = () => {
    setNoOfNewMessages(0);
  };

  const incrementNoOfNewMessages = () => {
    setNoOfNewMessages(noOfNewMessages + 1);
  };

  const handleClickChat = () => {
    if (!isChatOpen) {
      resetNoOfNewMessages();
    }

    setIsChatOpen(!isChatOpen);
  };

  const handleOnType = (message) => {
    setCurrMessage(message);
  };

  const handleSendMessage = () => {
    socket.emit("chatMessage", currMessage);
  };

  const handleReceiveMessage = (msgObj) => {
    const updatedMessages = [...messages];
    updatedMessages.push(msgObj);
    setMessages(updatedMessages);
  };

  return {
    isChatOpen,
    messages,
    noOfNewMessages,
    handleClickChat,
    handleOnType,
    handleSendMessage,
  };
};

export default useChat;
