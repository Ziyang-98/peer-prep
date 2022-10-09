import { Box } from "@mui/system";
import DOMPurify from "dompurify";
import { styles } from "./styles";

const QuestionPane = ({ questionObject }) => {
  var sanitisedHTML = DOMPurify.sanitize(questionObject);

  return (
    <Box sx={styles.container}>
      <div
        style={styles.text}
        dangerouslySetInnerHTML={{ __html: sanitisedHTML }}
      />
    </Box>
  );
};

export default QuestionPane;
