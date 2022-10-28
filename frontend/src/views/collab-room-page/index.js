import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Split from "react-split";
import RoomTimer from "components/RoomTimer";
import QuestionPane from "components/QuestionPane";
import UsersDisplay from "components/UsersDisplay";
import Editor from "components/Editor";
import Notification from "components/Notification";
import Chat from "components/Chat";
import CollabChatButton from "components/CollabChatButton";

import useNotification from "hooks/useNotification";
import useCollabEditor from "hooks/useCollabEditor";
import useQuestion from "hooks/useQuestion";
import useChat from "hooks/useChat";
import { styles } from "./styles";

// For draggable gutter styles
import "./styles.css";

const CollabRoomPage = () => {
  const { handleOpenNotification, snackbarProps, alertProps, message } =
    useNotification();

  const { editorProps, users, timer } = useCollabEditor(handleOpenNotification);

  const { questionObject, questionName } = useQuestion(handleOpenNotification);

  const {
    isChatOpen,
    messages,
    handleClickChat,
    handleOnType,
    handleSendMessage,
  } = useChat();
  return (
    <Box sx={styles.mainContainer}>
      <RoomTimer timeInMs={timer} />
      <Split direction={"horizontal"} style={styles.split}>
        <Box sx={styles.panel}>
          <QuestionPane
            questionObject={questionObject}
            questionName={questionName}
          />
        </Box>
        <Box sx={styles.panel}>
          <UsersDisplay activeUsers={users} />
          <Editor editorProps={editorProps} />
        </Box>
      </Split>
      <Box sx={styles.bottomActionHolder}>
        <Chat
          isChatOpen={isChatOpen}
          messages={messages}
          handleOnType={handleOnType}
          handleSendMessage={handleSendMessage}
        />
        <CollabChatButton handleClickChat={handleClickChat} />
        <Button
          variant="contained"
          sx={styles.endSessionButton}
          href="/endOfSession"
        >
          End session
        </Button>
      </Box>
      <Notification
        snackbarProps={snackbarProps}
        alertProps={alertProps}
        message={message}
      />
    </Box>
  );
};

export default CollabRoomPage;
