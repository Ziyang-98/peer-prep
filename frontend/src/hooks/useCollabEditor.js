import { useState, useCallback } from "react";
import { getNewLines } from "common/utils";

const DEFAULT_NO_OF_LINES = getNewLines(20);

const DEFAULT_EDITOR_VALUE = "# Enter your answer here" + DEFAULT_NO_OF_LINES;

const useCollabEditor = (handleOpenNotification) => {
  const [editorValue, setEditorValue] = useState(DEFAULT_EDITOR_VALUE);

  // TODO: Add logic to connect with backend socket

  // Note: Can use handleOpenNotification to notify user in small popup if theres issues reaching backend or room id does not exist
  // handleOpenNotification(message, timeoutTime, type)
  // - message: Message to show user
  // - timeoutTime: time popup takes to exit in ms
  // - type: type of notification ("success" || "error")
  // Example usage: handleOpenNotification("Encounter issues finding room!", 4000, "error")

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
