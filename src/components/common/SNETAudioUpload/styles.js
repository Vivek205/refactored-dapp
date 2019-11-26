export const useStyles = theme => ({
  mainContainer: {
    width: 500,
    minHeight: 264,
    position: "relative",
  },
  audioUploderContainer: {
    color: "black",
    backgroundColor: theme.palette.text.white,
  },
  audioUploderParentGrid: {
    display: "flex",
    alignItems: "center",
  },
  audioUploderHeader: {
    "& h6": {
      padding: 4,
      fontFamily: theme.typography.primary.main,
      fontSize: 18,
    },
  },
  mainTabs: {
    "& button": {
      minWidth: "fit-content",
      flexGrow: 0,
    },
    "& .MuiTabs-indicator": {
      bottom: 8,
      backgroundColor: theme.palette.text.primary,
    },
  },
  uploadTabContainer: {
    "& input": { display: "none" },
  },
  Box: {
    height: 297,
    borderWidth: 1,
    borderColor: "#d6d6d6",
    borderStyle: "dashed",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    overflow: "hidden",
  },
  tabStyle: {
    position: "relative",
    overflow: "hidden",
    height: 300,
  },
  tabLabelStyle: {
    fontFamily: theme.typography.primary.main,
    fontVariantCaps: "normal",
    textTransform: "initial",
    fontSize: 14,
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
  urlTabContainer: {
    display: "flex",
    justifyContent: "center",
    "& .MuiTextField-root": {
      width: "80%",
      "& label": {
        "& span": {
          fontWeight: "normal",
          fontSize: 12,
        },
      },
      "& button": {
        padding: 0,
        color: theme.palette.text.primary,
      },
    },
  },
  galleryTabContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  galleryTabGridList: {
    height: 300,
    width: "100%",
  },
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
    "& span": {
      display: "flex",
      alignItems: "center",
      align: "center",
      justifyContent: "space-between",
      "& p": {
        fontFamily: theme.typography.primary.main,
        fontSize: 14,
      },
    },
  },
});
