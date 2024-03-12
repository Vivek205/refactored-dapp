export const useStyles = (theme) => ({
  existingModelContainer: {
    paddingBottom: 24,
    borderRadius: 4,
    margin: "25px 0 0",
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.text.white,
    "& h2": {
      padding: "11px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      fontWeight: 400,
    },
    "@media(max-width:768px)": {
      padding: "17px 22px",
      flexDirection: "column",
    },
  },
  btnContainer: {
    textAlign: "center",
  },
  connectMMContainer: {
    width: "100%",
    padding: "80px 0",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    "& > span": {
      marginTop: 24,
      color: theme.palette.text.primary,
      fontSize: 18,
      lineHeight: "23px",
    },
    "& p": {
      margin: "9px 0",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "24px",
    },
  },
  noDataFoundTxt: {
    paddingTop: 24,
    textAlign: "center",
    "& p": { fontFamily: theme.typography.primary.main },
  },
});
