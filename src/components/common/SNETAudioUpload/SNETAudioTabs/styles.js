export const useStyles = theme => ({
  tabsSnackbar: {
    width: "100%",
    position: "absolute",
  },
  tabsSnackbarContent: {
    margin: "2px",
    border: "2px solid",
    borderRadius: "4px",
    padding: "2px",
    display: "flex",
    justifyContent: "space-around",
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.text.snetBackgroundRed,
    color: theme.palette.text.snetRed,
    "& span": {
      display: "flex",
      alignItems: "center",
      align: "center",
      justifyContent: "space-between",
      color: theme.palette.text.snetGreyError,
      "& svg": {
        fontSize: 16,
        opacity: 0.9,
        marginRight: 8,
      },
      "& p": {
        color: theme.palette.text.snetGrey,
        fontFamily: theme.typography.primary.main,
        fontSize: 14,
      },
    },
  },
});
