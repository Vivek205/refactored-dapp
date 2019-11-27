export const useStyles = theme => ({
  uploadTabContainer: {
    "& input": { display: "none" },
  },
  uploadBoxContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg": {
      color: theme.palette.text.primary,
      fontSize: 48,
    },
  },
  uploadBoxTitle: {
    fontFamily: theme.typography.primary.main,
    fontSize: 16,
    color: "#9e9e9e",
    "& a": {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
  },
  uploadBoxDescription: {
    width: "58%",
    margin: "0 auto",
    fontFamily: theme.typography.primary.main,
    fontSize: 12,
    color: "#9b9b9b",
    textAlign: "center",
    padding: "8px 0",
  },
});
