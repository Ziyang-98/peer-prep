import React from "react";
import Box from "@mui/material/Box";
import Split from "react-split";
import QuestionPane from "components/QuestionPane";
import UsersDisplay from "components/UsersDisplay";
import Editor from "components/Editor";
import Notification from "components/Notification";

import useNotification from "hooks/useNotification";
import useCollabEditor from "hooks/useCollabEditor";
import useQuestion from "hooks/useQuestion";
import { styles } from "./styles";

// For draggable gutter styles
import "./styles.css";

const CollabRoomPage = () => {
  const { handleOpenNotification, snackbarProps, alertProps, message } =
    useNotification();

  const { editorProps, partner } = useCollabEditor(handleOpenNotification);

  const { questionObject, questionName } = useQuestion(handleOpenNotification);

  return (
    <Box sx={styles.mainContainer}>
      <Split direction={"horizontal"} style={styles.split}>
        <Box sx={styles.panel}>
          <QuestionPane
            questionObject={questionObject}
            questionName={questionName}
          />
        </Box>
        <Box sx={styles.panel}>
          <UsersDisplay activePartner={partner} />
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
