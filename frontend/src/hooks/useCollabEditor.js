import { useState, useEffect, useCallback } from "react";
import { getNewLines } from "common/utils";
import { URI_COLLAB_SVC } from "common/configs";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useCookies } from "react-cookie";

const DEFAULT_NO_OF_LINES = getNewLines(20);

const DEFAULT_EDITOR_VALUE = "# Enter your answer here" + DEFAULT_NO_OF_LINES;

const useCollabEditor = (handleOpenNotification) => {
  const [editorValue, setEditorValue] = useState(DEFAULT_EDITOR_VALUE);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [cookies] = useCookies(["token"]);

  const search = useLocation().search;
  const roomId = new URLSearchParams(search).get("roomId");

  useEffect(() => {
    const socket = io.connect(URI_COLLAB_SVC);
    setSocket(socket);
    socket.on("connect", function () {
      const user = cookies.username;

      if (!user) {
        console.error("No username found");
        handleOpenNotification("No username found!", 3000, "error");
      }
      socket.emit("joinRoom", { roomId, user });
    });

    socket.on("usersInRoom", ({ usersInRoom }) => {
      setUsers(usersInRoom);
    });

    // Error Handlers
    socket.on("connect_error", (err) => {
      handleOpenNotification(
        "Encountered issues connecting to server!",
        3000,
        "error",
      );
    });

    socket.on("disconnect", () => {
      handleOpenNotification("Lost connection to the server!", 3000, "error");
    });

    socket.on("userDisconnect", ({ user }) => {
      handleOpenNotification(`${user} has disconnected!`, 3000, "warning");
    });

    socket.on("codeUpdated", ({ code }) => {
      setEditorValue(code);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditorChange = useCallback(
    (value, viewUpdate) => {
      console.log(viewUpdate);
      if (viewUpdate.docChanged && viewUpdate.selectionSet)
        socket.emit("codeChanged", { code: value });
    },
    [socket],
  );

  return {
    editorProps: {
      value: editorValue,
      onChange: handleEditorChange,
    },
    users,
  };
};

export default useCollabEditor;
