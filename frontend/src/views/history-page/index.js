import { Box, ListItemButton, ListItemText, Paper } from "@mui/material";
import { formatDistance } from "date-fns";
import { styles } from "./styles";
import useHistory from "hooks/useHistory";

const historiesMock = [
  {
    title: "Two Sum",
    titleSlug: "two-sum",
    createdAt: new Date(2022, 10 - 1, 31),
  },
  {
    title: "Group Anagrams",
    titleSlug: "group-anagrams",
    createdAt: new Date(2022, 11 - 1, 1, 16),
  },
  {
    title: "Generate Parentheses",
    titleSlug: "generate-parentheses",
    createdAt: new Date(),
  },
];

const HistoryPage = () => {
  const { handleQuestionClick, history } = useHistory();
  historiesMock.sort((a, b) => b.createdAt - a.createdAt);
  return (
    <Box sx={styles.box}>
      <Paper elevation={3} sx={styles.paper}>
        {
          /* TODO: change historiesMock to history */
          historiesMock.map((question) => (
            <ListItemButton
              sx={styles.listItemButton}
              component="a"
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
          ))
        }
      </Paper>
    </Box>
  );
};

export default HistoryPage;
