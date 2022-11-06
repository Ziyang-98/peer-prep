export const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "90vh",
  },
  bottomActionHolder: {
    width: "90%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    mt: "20px",
    position: "relative",
  },
  returnButton: {
    height: "40px",
    bgcolor: "primary.mainColor",
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
};
