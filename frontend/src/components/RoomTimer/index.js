import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getTimeInSeconds, getTimeInMins } from "common/utils";
import { styles } from "./styles";

const RoomTimer = ({ timeInMs }) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4">
        {(getTimeInMins(timeInMs)
          ? `${getTimeInMins(timeInMs)} mins`
          : `${getTimeInSeconds(timeInMs)} secs`) + " left"}
      </Typography>
    </Box>
  );
};

export default RoomTimer;
