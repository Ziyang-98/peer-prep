import { Box, ListItemButton, ListItemText, Paper } from "@mui/material";
import { formatDistance } from "date-fns";
import { styles } from "./styles";
import useHistory from "hooks/useHistory";

const HistoryPage = () => {
  const { handleQuestionClick, pastQuestions } = useHistory();

  return (
    <Box sx={styles.box}>
      <Paper elevation={3} sx={styles.paper}>
        {pastQuestions.map((question) => (
          <ListItemButton
            sx={styles.listItemButton}
            component="a"
            key={question.titleSlug}
            onClick={() => handleQuestionClick(question.titleSlug)}
          >
            <ListItemText primary={question.title} />
            <ListItemText
              sx={styles.duration}
              primary={formatDistance(question.createdAt, new Date(), {
                addSuffix: true,
              })}
            />
          </ListItemButton>
        ))}
      </Paper>
    </Box>
  );
};

export default HistoryPage;
