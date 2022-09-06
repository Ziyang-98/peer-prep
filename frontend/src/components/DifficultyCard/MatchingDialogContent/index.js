import React from "react";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import Grow from "@mui/material/Grow";
import { useStyles } from "./useStyles";

const DialogContentText = ({ text, state, styles }) => (
  <Grow in={state} {...(state ? { timeout: 2000 } : {})}>
    <Typography variant="subtitle1" sx={styles.failureText}>
      {text}
    </Typography>
  </Grow>
);

const MatchingDialogContent = ({
  timer,
  success,
  failure,
  loading,
  error,
  handleMatchButtonClick,
}) => {
  const styles = useStyles(success, failure, error);

  const initState = !loading && !success && !error && !failure;

  return (
    <DialogContent>
      <Box sx={styles.dialogContent}>
        <Box sx={styles.buttonHolder}>
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
        </Box>

        {initState && (
          <DialogContentText
            text={"Click to start finding a match!"}
            state={initState}
            styles={styles}
          />
        )}
        {loading && (
          <DialogContentText
            text={"Once matched, you will be redirected to a room."}
            state={loading}
            styles={styles}
          />
        )}
        {success && (
          <DialogContentText
            text={"Matched found! Redirecting to room..."}
            state={success}
            styles={styles}
          />
        )}
        {failure && (
          <DialogContentText
            text={
              "Click to search for match again, or try selecting another difficulty?"
            }
            state={failure}
            styles={styles}
          />
        )}
        {error && (
          <DialogContentText
            text={"Encountered issues when matching, please try again later!"}
            state={error}
            styles={styles}
          />
        )}
      </Box>
    </DialogContent>
  );
};

export default MatchingDialogContent;
