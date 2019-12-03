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
    padding: "0 10px",
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
    "& .MuiTab-textColorPrimary.Mui-selected": { color: theme.palette.text.primary },
    "& .MuiTabs-indicator": {
      bottom: 8,
      backgroundColor: theme.palette.text.primary,
    },
  },
  Box: {
    height: 297,
    borderWidth: 1,
    borderColor: "#d6d6d6",
    borderStyle: "dashed",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  fileDragableArea: {
    height: 215,
    backgroundColor: theme.palette.text.snetBackgroundGrey,
    "& > div": {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
});
