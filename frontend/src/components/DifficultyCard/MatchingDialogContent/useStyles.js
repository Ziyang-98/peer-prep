import { blue, green, red } from "@mui/material/colors";

export const useStyles = (success, failure, error) => ({
  dialogContent: {
    mt: 4,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  matchingButton: {
    height: "156px",
    width: "156px",

    ...(!success &&
      !failure && {
        bgcolor: blue[500],
        "&:hover": {
          bgcolor: blue[300],
        },
      }),

    ...((failure || error) && {
      bgcolor: red[500],
      "&:hover": {
        bgcolor: red[200],
      },
    }),

    "&.Mui-disabled": {
      bgcolor: green[500],
    },
  },
  buttonHolder: { m: 1, position: "relative" },
  circularProgress: {
    color: blue[200],
    position: "absolute",
    zIndex: 1,
    top: -6,
    left: -6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "monospace",
    fontWeight: 100,
  },
  failureText: {
    mt: 2,
    textAlign: "center",
  },
});
