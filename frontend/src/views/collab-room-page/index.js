import React from "react";
import Box from "@mui/material/Box";

import { styles } from "./styles";

const CollabRoomPage = () => {
  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.questionContainer}> Question Container</Box>
      <Box sx={styles.editorContainer}> Editor Container</Box>
    </Box>
  );
};

export default CollabRoomPage;
