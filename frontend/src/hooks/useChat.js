import { useState } from "react";

const mockMessages = [
  { username: "user1", text: "message 1", time: "3.33pm" },
  {
    username: "user2",
    text: "this is a long message message messagemessagemessagemessagemessagemessagemessagemessagemessage",
    time: "3.40pm",
  },
];

const useChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages] = useState(mockMessages);
  const [currMessage, setCurrMessage] = useState("");

  const handleClickChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleOnType = (message) => {
    setCurrMessage(message);
  };

  const handleSendMessage = () => {
    console.log(currMessage);
  };

  return {
    isChatOpen,
    messages,
    handleClickChat,
    handleOnType,
    handleSendMessage,
  };
};

export default useChat;
