import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RoomTimer from "components/RoomTimer";
import Notification from "components/Notification";
import Chat from "components/Chat";
import CollabChatButton from "components/CollabChatButton";
import QuestionEditorPanel from "components/QuestionEditorPanel";

import useNotification from "hooks/useNotification";
import useCollabEditor from "hooks/useCollabEditor";
import useChat from "hooks/useChat";
import { styles } from "./styles";

// For draggable gutter styles
import "./styles.css";

const CollabRoomPage = () => {
  const { handleOpenNotification, snackbarProps, alertProps, message } =
    useNotification();

  const { editorProps, users, timer } = useCollabEditor(handleOpenNotification);
  const roomType = "collab";

  const {
    isChatOpen,
    messages,
    noOfNewMessages,
    handleClickChat,
    currMessage,
    handleSendMessage,
    handleEnterSendMessage,
    handleOnType,
  } = useChat();
  return (
    <Box sx={styles.mainContainer}>
      <RoomTimer timeInMs={timer} />
      <QuestionEditorPanel
        editorProps={editorProps}
        users={users}
        handleOpenNotification={handleOpenNotification}
        type={roomType}
      />
      <Box sx={styles.bottomActionHolder}>
        <Chat
          isChatOpen={isChatOpen}
          messages={messages}
          currMessage={currMessage}
          handleSendMessage={handleSendMessage}
          handleEnterSendMessage={handleEnterSendMessage}
          handleOnType={handleOnType}
        />
        <CollabChatButton
          handleClickChat={handleClickChat}
          noOfNewMessages={noOfNewMessages}
        />
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
