import { useState, useEffect, useCallback, useRef } from "react";
import { getNewLines } from "common/utils";
import { URI_COLLAB_SVC } from "common/configs";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useCookies } from "react-cookie";

const DEFAULT_NO_OF_LINES = getNewLines(20);

const DEFAULT_EDITOR_VALUE = "# Enter your answer here" + DEFAULT_NO_OF_LINES;

const useCollabEditor = (handleOpenNotification) => {
  const [editorValue, setEditorValue] = useState(DEFAULT_EDITOR_VALUE);
  const [socket, setSocket] = useState(null);

  const [cookies] = useCookies(["token"]);

  const socketSet = useRef(false);

  const search = useLocation().search;
  const roomId = new URLSearchParams(search).get("roomId");

  // TODO: Add logic to connect with backend socket

  // Note: Can use handleOpenNotification to notify user in small popup if theres issues reaching backend or room id does not exist
  // handleOpenNotification(message, timeoutTime, type)
  // - message: Message to show user
  // - timeoutTime: time popup takes to exit in ms
  // - type: type of notification ("success" || "error")
  // Example usage: handleOpenNotification("Encounter issues finding room!", 4000, "error")

  useEffect(() => {
    if (socketSet.current) return;
    socketSet.current = true;

    console.log("using effect");
    const socket = io.connect(URI_COLLAB_SVC);

    socket.on("connect", function () {
      const user = cookies.username;

      if (!user) {
        console.error("No username found");
        handleOpenNotification("No username found!", 3000, "error");
      }
      socket.emit("joinRoom", { roomId, user });

      socket.on("usersInRoom", ({ usersInRoom }) => {
        console.log(usersInRoom);
      });
    });

    // Error Handlers

    socket.on("connect_error", (err) => {
      handleOpenNotification(
        "Encountered issues connecting to server!",
        3000,
        "error",
      );
    });

    socket.on("disconnect", function () {
      handleOpenNotification("Lost connection to the server!", 3000, "error");
    });
  }, []);

  const handleEditorChange = useCallback((value, viewUpdate) => {
    console.log("value:", value);
    setEditorValue(value);
  }, []);

  return {
    editorProps: {
      value: editorValue,
      onChange: handleEditorChange,
    },
  };
};

export default useCollabEditor;
