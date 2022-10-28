export const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "90vh",
    // paddingTop: "16px",
  },
  split: {
    display: "flex",
    height: "85%",
    width: "90%",
  },

  panel: {
    bgcolor: "#f9f9f9",
    overflow: "auto",
  },
  bottomActionHolder: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mt: "20px",
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
