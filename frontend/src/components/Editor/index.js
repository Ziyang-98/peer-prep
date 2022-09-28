import React from "react";
import CodeMirror from "@uiw/react-codemirror";

const Editor = ({ editorProps }) => {
  return <CodeMirror {...editorProps} />;
};

export default Editor;
