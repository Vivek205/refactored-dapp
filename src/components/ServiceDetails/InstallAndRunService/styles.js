export const useStyles = (theme) => ({
  downloadTokenLink: {
    textDecoration: "none",
    color: "inherit",
    height: "100%",
    display: "block",
    width: "min-content",
    whiteSpace: "nowrap",
  },
  cardContainer: {
    padding: "0 20px",
  },
  freecallcardContainer: {
    paddingBottom: 30,
  },
  overViewContainer: {
    display: "flex",
    gap: 25,
    flexDirection: "column",
    "& ul": {
      margin: "20px 0 0",
      padding: "0 22px",
      display: "flex",
      "& div": {
        "&:last-of-type": { marginLeft: "26%" },
      },
      "& li": {
        display: "flex",
        color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
        lineHeight: "24px",
        letterSpacing: "0.25px",
        listStyle: "none",
      },
    },
    "& h5": {
      margin: "40px 45px 0 0",
      display: "inline-block",
      color: theme.palette.text.lightShadedGray,
      fontSize: 16,
      "@media(max-width:800px)": { paddingLeft: 0 },
    },
  },
  integrationSetupContainer: {
    paddingBottom: 25,
    margin: "0 25px 0 0",
    borderRadius: 4,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.text.white,
    "@media(max-width:960px)": { marginRight: 0 },
  },
  integrationContent: {
    padding: "0 22px",
  },
  tabsHeader: {
    backgroundColor: "transparent",
    color: theme.palette.text.lightShadedGray,
    boxShadow: "none",
    "& button": {
      minWidth: "auto",
      padding: 0,
      marginRight: 40,
      fontSize: 18,
      textTransform: "none",
      color: theme.palette.text.lightShadedGray,
      fontFamily: "sans-serif",
    },
    "& .Mui-selected": { color: theme.palette.text.primary },
    "& .MuiTabs-indicator": { backgroundColor: theme.palette.text.primary },
  },
  intSetupDesc: {
    paddingRight: 42,
    margin: "16px 0 21px",
    color: theme.palette.text.mediumShadeGray,
    fontFamily: theme.typography.primary.main,
    fontSize: 14,
    lineHeight: "21px",
  },
  textfieldContainer: {
    "& > div": {
      marginBottom: 24,
      display: "flex",
      alignItems: "center",
      "@media(max-width: 600px)": {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    "& .MuiFormControl-root": {
      width: 595,
      margin: 0,
    },
  },
  publicAddDesc: {
    padding: "0 20px 0 40px",
    color: theme.palette.text.lightShadedGray,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: 0.25,
    "@media(max-width: 600px)": { margin: "10px 0" },
  },
  descriptionBtnsContainer: {
    "& p": {
      margin: "16px 0 24px",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
  },
  btnContainer: {
    display: "flex",
    gap: 20,
  },
});
