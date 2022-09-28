import React from "react";
import Box from "@mui/material/Box";
import Split from "react-split";
import QuestionPane from "components/QuestionPane";
import Editor from "components/Editor";
import Notification from "components/Notification";

import useNotification from "hooks/useNotification";
import useCollabEditor from "hooks/useCollabEditor";

import { styles } from "./styles";

// For draggable gutter styles
import "./styles.css";

const CollabRoomPage = () => {
  const { handleOpenNotification, snackbarProps, alertProps, message } =
    useNotification();

  const { editorProps } = useCollabEditor(handleOpenNotification);

  return (
    <Box sx={styles.mainContainer}>
      <Split direction={"horizontal"} style={styles.split}>
        <Box sx={styles.panel}>
          <QuestionPane />
        </Box>
        <Box sx={styles.panel}>
          <Editor editorProps={editorProps} />
        </Box>
      </Split>
      <Notification
        snackbarProps={snackbarProps}
        alertProps={alertProps}
        message={message}
      />
    </Box>
  );
};

export default CollabRoomPage;
