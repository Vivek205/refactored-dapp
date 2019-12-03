import React from "react";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import SNETAudioTabs from "./SNETAudioTabs";
import { useStyles } from "./styles";

class SNETAudioUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainState: this.props.outputImage ? "display" : "initial", // initial, loading, uploaded, display
      activeTab: 0,
      searchText: null,
      errorMessage: null,
      displayError: false,
    };

    this.handleClikAway = this.handleClikAway.bind(this);

    // Error Messages
    this.urlErrorMessage = "Incorrect URL or permission denied by server.";
    this.fileSizeError = "File size exceeds limits (" + this.props.maxImageSize / 1000000 + "mb).";
    this.fileTypeError = "File type not accepted. Allowed: " + this.props.allowedInputTypes + ".";
    this.inputAudioErrorMessage = "Content image could not be rendered.";
    this.outputAudioErrorMessage = "Output image could not be rendered.";
  }

  handleClikAway = () => {
    this.setState({ errorMessage: false });
  };

  render() {
    const { classes, disableUploadTab, allowedInputTypes } = this.props;
    const { mainState, activeTab, displayError, errorMessage } = this.state;

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
                  value={activeTab}
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
            {(mainState === "initial" || mainState === "display") && (
              <SNETAudioTabs
                activeTab={activeTab}
                allowedInputTypes={allowedInputTypes}
                displayError={displayError}
                errorMessage={errorMessage}
                handleAudioUpload={this.handleAudioUpload}
                handleClikAway={this.handleClikAway}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(SNETAudioUpload);
