export const styles = {
  chat: {
    bgcolor: "primary.light",
    height: "420px",
    width: "340px",
    paddingButtom: "10%",
    boxShadow: 16,
    borderColor: "primary.dark",
    borderRadius: "8px",
    "&::before": {
      content: '""',
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "24px solid #e9e7fc",
      borderRight: "12px solid transparent",
      borderTop: "12px solid #e9e7fc",
      borderBottom: "20px solid transparent",
      left: "16px",
      bottom: "-24px",
    },
  },
  hide: {
    display: "none",
  },
  show: {
    display: "block",
    position: "absolute",
    left: "16px",
    bottom: "86px",
  },
};
