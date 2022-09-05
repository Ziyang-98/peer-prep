import React from "react";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMatching from "hooks/useMatching";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import Grow from "@mui/material/Grow";
import { useStyles } from "./useStyles";

const MatchingDialogContent = () => {
  const { timer, success, failure, loading, handleMatchButtonClick } =
    useMatching();

  const styles = useStyles(success, failure);

  return (
    <DialogContent>
      <Box sx={styles.dialogContent}>
        <IconButton
          sx={styles.matchingButton}
          onClick={handleMatchButtonClick}
          disabled={success}
        >
          {success && <CheckIcon sx={styles.buttonText} />}
          {failure && (
            <Typography variant="h5" sx={styles.buttonText}>
              No Match
            </Typography>
          )}

          {loading && (
            <Typography variant="h5" sx={styles.buttonText}>
              {`${timer}s`}
            </Typography>
          )}

          {!loading && !success && !failure && (
            <Typography variant="h5" sx={styles.buttonText}>
              Match
            </Typography>
          )}
        </IconButton>
        {loading && (
          <CircularProgress
            size={168}
            thickness={1}
            sx={styles.circularProgress}
          />
        )}
        {failure && (
          <Grow in={failure} {...(failure ? { timeout: 2000 } : {})}>
            <Typography variant="subtitle1" sx={styles.failureText}>
              Click to search for match again, or try selecting another
              difficulty?
            </Typography>
          </Grow>
        )}
      </Box>
    </DialogContent>
  );
};

export default MatchingDialogContent;
