export const styles = {
  grow: {
    transformOrigin: "left bottom",
  },
  hide: {
    display: "none",
  },
  show: {
    display: "block",
    position: "absolute",
    left: "28px",
    bottom: "86px",
  },
  chat: {
    bgcolor: "primary.light",
    height: "420px",
    width: "340px",
    paddingButtom: "10%",
    boxShadow: 4,
    borderColor: "primary.dark",
    borderRadius: "8px",
    "&::before": {
      content: '""',
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "24px solid #e9e7fc",
      borderRight: "24px solid transparent",
      borderTop: "24px solid #e9e7fc",
      borderBottom: "20px solid transparent",
      left: "16px",
      bottom: "-24px",
    },
  },
};
