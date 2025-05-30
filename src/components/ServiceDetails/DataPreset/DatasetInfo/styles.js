export const useStyles = (theme) => ({
  datasetParameter: {
    flex: 1,
    display: "flex",
    padding: "14px 10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 6,
    borderRadius: 4,
    border: `1px solid ${theme.palette.text.verticalTabLeftBorder}`,
  },
  parametersContainer: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  additionalInfoContainer: {
    display: "none",
    position: "absolute",
    zIndex: 1,
    right: "-120px",
    top: "-15px",
    borderRadius: 4,
    padding: "10px 25px",
    background: theme.palette.text.cardBackground,
    boxShadow: "0px 0px 6.5px 0px rgba(46, 46, 46, 0.25)",
  },
  additionalFieldRaw: {
    display: "flex",
    gap: 6,
    textWrap: "nowrap",
  },
  additionalFieldValue: {
    fontWeight: 700,
    background: "linear-gradient(90deg, #8279FE 0%, #449CEE 100%)",
    backgroundClip: "text",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  parameterTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    cursor: "pointer",
    position: "relative",
    color: theme.palette.text.mediumShadeGray,
    "& svg": {
      width: 20,
      height: 20,
      color: theme.palette.text.primary,
    },
    "&:hover": {
      "& span": {
        display: "block",
      },
    },
  },
  parameterTitle: {
    margin: 0,
    fontSize: 17,
    fontWeight: 600,
  },
  parameterValue: {
    margin: 0,
    fontSize: 24,
    fontWeight: 600,
  },
});
