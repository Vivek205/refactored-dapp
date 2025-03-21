export const useStyles = (theme) => ({
  dataPresetContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  datasetUploaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: 30,
    "@media(max-width: 1024px)": {
      flexDirection: "column",
    },
  },
  fineTuneBatton: {
    textAlign: "right",
  },
  verticalCentered: {
    alignItems: "center",
  },
  fileZone: {
    width: "40%",
    "@media(max-width: 1024px)": {
      width: "100% !important",
    },
  },
  fileZoneExtended: {
    width: "50%",
    "@media(max-width: 1024px)": {
      width: "100% !important",
    },
  },
  mergeButtonContainer: {
    "& button": {
      minWidth: "auto",
    },
  },
  mergeButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg": {
      transform: "rotate(180deg)",
    },
  },
  emptyFirstDataset: {
    minHeight: 500,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    textAlign: "center",
    color: theme.palette.text.lightShadedGray,
    "& svg": {
      width: 60,
      height: 60,
    },
  },
});
