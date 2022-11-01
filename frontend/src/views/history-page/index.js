import { Box, ListItemButton, ListItemText, Paper } from "@mui/material";
import { styles } from "./styles";
import useHistory from "hooks/useHistory";

const historiesMock = [
  {
    title: "Two Sum",
    titleSlug: "two-sum",
  },
  {
    title: "Group Anagrams",
    titleSlug: "group-anagrams",
  },
  {
    title: "Generate Parentheses",
    titleSlug: "generate-parentheses",
  },
];

const HistoryPage = () => {
  const { handleQuestionClick, history } = useHistory();

  return (
    <Box sx={styles.box}>
      <Paper elevation={3} sx={styles.paper}>
        {
          /* TODO: change historiesMock to history */
          historiesMock.map((question) => (
            <ListItemButton
              component="a"
              onClick={() => handleQuestionClick(question.titleSlug)}
            >
              <ListItemText primary={question.title} />
            </ListItemButton>
          ))
        }
      </Paper>
    </Box>
  );
};

export default HistoryPage;
