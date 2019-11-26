import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import { CloudUpload } from "@material-ui/icons";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";

import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import SwipeableViews from "react-swipeable-views";
import FileDrop from "react-file-drop";

import { useStyles } from "./styles";

class SNETAudioUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainState: this.props.outputImage ? "display" : "initial", // initial, loading, uploaded, display
      value: 0,
      searchText: null,
      errorMessage: null,
      displayError: false,
    };

    // Error Messages
    this.urlErrorMessage = "Incorrect URL or permission denied by server.";
    this.fileSizeError = "File size exceeds limits (" + this.props.maxImageSize / 1000000 + "mb).";
    this.fileTypeError = "File type not accepted. Allowed: " + this.props.allowedInputTypes + ".";
    this.inputImageErrorMessage = "Content image could not be rendered.";
    this.outputImageErrorMessage = "Output image could not be rendered.";
  }

  renderUploadTab() {
    const { classes, allowedInputTypes } = this.props;
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.uploadTabContainer}>
        <FileDrop onDrop={(files, event) => this.handleAudioUpload(files, event)}>
          <input
            id="myInput"
            type="file"
            accept={allowedInputTypes}
            onChange={e => this.handleAudioUpload(e.target.files, e)}
            ref={input => (this.inputElement = input)}
          />
          <div onClick={() => this.inputElement.click()} className={(classes.uploadBox, classes.Box)}>
            <div className={classes.uploadBoxContent}>
              <CloudUpload />
              <Typography className={classes.uploadBoxTitle}>
                Drag and drop file here or <a href="#">click</a>
              </Typography>
              <Typography className={classes.uploadBoxDescription} />
            </div>
          </div>
        </FileDrop>
      </Grid>
    );
  }

  renderTabs() {
    const { classes } = this.props;
    const { value, displayError, errorMessage } = this.state;
    return (
      <div className={(classes.tabStyle, classes.tabsMainContainer)}>
        <SwipeableViews axis="x" index={value}>
          <div>{this.renderUploadTab()}</div>
        </SwipeableViews>
        <ClickAwayListener onClickAway={() => this.setState({ displayError: false })}>
          <Snackbar
            className={classes.tabsSnackbar}
            open={displayError}
            autoHideDuration={5000}
            TransitionComponent={Slide}
            transitionDuration={300}
            onClose={() => this.setState({ displayError: false })}
          >
            <SnackbarContent
              className={classes.tabsSnackbarContent}
              aria-describedby="client-snackbar"
              message={
                <span>
                  <ErrorIcon />
                  <Typography>{errorMessage}</Typography>
                </span>
              }
            />
          </Snackbar>
        </ClickAwayListener>
      </div>
    );
  }

  render() {
    const { classes, disableUploadTab } = this.props;
    const { mainState, value } = this.state;

    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.audioUploderContainer} spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.audioUploderParentGrid}>
            <Grid item xs={4} className={classes.audioUploderHeader}>
              <Typography color="inherit" noWrap variant="h6">
                Audio Uploader
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.mainTabs}>
              <MuiThemeProvider theme={this.theme}>
                <Tabs
                  value={value}
                  onChange={this.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  TabIndicatorProps
                >
                  {mainState !== "uploaded" && !(mainState === "display") && !disableUploadTab && (
                    <Tab value={0} label={<span className={classes.tabLabelStyle}>Upload</span>} />
                  )}
                </Tabs>
              </MuiThemeProvider>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.fileDragableArea}>
            {(mainState === "initial" || mainState === "display") && this.renderTabs()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(SNETAudioUpload);
