export const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "90%",
    padding: 0,
    overflowY: "auto",
  },
  bottomActionHolder: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    m: "20px 0",
    position: "relative",
  },
  endSessionButton: {
    height: "40px",
    bgcolor: "primary.mainColor",
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
};
