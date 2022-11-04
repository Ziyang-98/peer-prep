import React from "react";
import Box from "@mui/material/Box";
import Split from "react-split";
import QuestionPane from "components/QuestionPane";
import UsersDisplay from "components/UsersDisplay";
import Editor from "components/Editor";

import useQuestion from "hooks/useQuestion";

import { isCollabType } from "common/utils";
import { styles } from "./styles";

import "./styles.css";

const QuestionEditorPanel = ({
  editorProps,
  users,
  handleOpenNotification,
  type,
}) => {
  const { questionObject, questionName } = useQuestion(
    handleOpenNotification,
    type,
  );
  return (
    <Split direction={"horizontal"} style={styles.split}>
      <Box sx={styles.panel}>
        <QuestionPane
          questionObject={questionObject}
          questionName={questionName}
        />
      </Box>
      <Box sx={styles.panel}>
        {isCollabType(type) && <UsersDisplay activeUsers={users} />}
        <Editor editorProps={editorProps} />
      </Box>
    </Split>
  );
};

export default QuestionEditorPanel;
