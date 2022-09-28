import React from "react";
import Box from "@mui/material/Box";
import Split from "react-split";
import QuestionPane from "components/QuestionPane";
import Editor from "components/Editor";
import { styles } from "./styles";

// For draggable gutter styles
import "./styles.css";

const CollabRoomPage = () => {
  return (
    <Box sx={styles.mainContainer}>
      <Split direction={"horizontal"} style={styles.split}>
        <Box sx={styles.panel}>
          <QuestionPane />
        </Box>
        <Box sx={styles.panel}>
          <Editor />
        </Box>
      </Split>
    </Box>
  );
};

export default CollabRoomPage;
