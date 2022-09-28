import React from "react";
import CodeMirror from "@uiw/react-codemirror";

const Editor = () => {
  return (
    <CodeMirror value="# Enter your answer here" styles={{ height: "100%" }} />
  );
};

export default Editor;
