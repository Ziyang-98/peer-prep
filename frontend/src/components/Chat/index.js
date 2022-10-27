import React from "react";
import Box from "@mui/material/Box";
import { styles } from "./styles";

const Chat = () => {
  const showStub = true;
  return (
    <Box sx={showStub ? styles.show : styles.hide}>
      <Box aria-label="chat" sx={styles.chat}>
        Hello World
      </Box>
    </Box>
  );
};

export default Chat;
