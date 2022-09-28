import React from "react";
import Box from "@mui/material/Box";
import Split from "react-split";

import { styles } from "./styles";

// For draggable gutter styles
import "./styles.css";

const CollabRoomPage = () => {
  return (
    <Box sx={styles.mainContainer}>
      <Split direction={"horizontal"} size={[50, 50]} style={styles.split}>
        <Box sx={styles.panel}> Question Container</Box>
        <Box sx={styles.panel}> Editor Container</Box>
      </Split>
    </Box>
  );
};

export default CollabRoomPage;
