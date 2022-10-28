import React from "react";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import { styles } from "./styles";

const Chat = ({ isChatOpen }) => {
  return (
    <Grow in={isChatOpen} style={styles.grow}>
      <Box sx={styles.show}>
        <Box aria-label="chat" sx={styles.chat}>
          Hello World
        </Box>
      </Box>
    </Grow>
  );
};

export default Chat;
