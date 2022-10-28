import { useState } from "react";

const useChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleClickChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return { isChatOpen, handleClickChat };
};

export default useChat;
