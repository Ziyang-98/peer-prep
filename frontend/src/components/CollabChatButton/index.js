import React from "react";
import Fab from "@mui/material/Fab";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { styles } from "./styles";

const CollabChatButton = () => {
  return (
    <Fab sx={styles.fab} aria-label="chat-button" color="primary.dark">
      <ChatBubbleIcon sx={styles.chatIcon} />
    </Fab>
  );
};

export default CollabChatButton;
