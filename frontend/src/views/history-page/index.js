import { Box, ListItemButton, ListItemText, Paper } from "@mui/material";
import { styles } from "./styles";
import useHistory from "hooks/useHistory";

const historiesMock = [
  {
    title: "Two Sum",
    "title-slug": "two-sum",
  },
  {
    title: "Group Anagrams",
    "title-slug": "group-anagrams",
  },
  {
    title: "Generate Parentheses",
    "title-slug": "generate-parentheses",
  },
];

const HistoryPage = () => {
  const { handleQuestionClick } = useHistory();

  return (
    <Box sx={styles.box}>
      <Paper elevation={3} sx={styles.paper}>
        {historiesMock.map((question) => (
          <ListItemButton
            component="a"
            onClick={() => handleQuestionClick(question["title-slug"])}
          >
            <ListItemText primary={question.title} />
          </ListItemButton>
        ))}
      </Paper>
    </Box>
  );
};

export default HistoryPage;
