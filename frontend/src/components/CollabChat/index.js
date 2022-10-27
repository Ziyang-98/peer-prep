import React from "react";
import Fab from "@mui/material/Fab";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { styles } from "./styles";

const CollabChat = () => {
  return (
    <Fab sx={styles.fab} aria-label="chat" color="primary.dark">
      <ChatBubbleIcon sx={styles.chatIcon} />
    </Fab>
  );
};

export default CollabChat;
