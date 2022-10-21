import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getTimeInSeconds, getTimeInMins } from "common/utils";
import { styles } from "./styles";

const RoomTimer = ({ timeInMs }) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4">
        {getTimeInMins(timeInMs)
          ? `${getTimeInMins(timeInMs)} mins left`
          : getTimeInSeconds(timeInMs) !== null
          ? `${getTimeInSeconds(timeInMs)} secs left`
          : "Timer not initiated"}
      </Typography>
    </Box>
  );
};

export default RoomTimer;
