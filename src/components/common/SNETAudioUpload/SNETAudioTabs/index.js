import React from "react";
import PropTypes from "prop-types";
import ErrorIcon from "@material-ui/icons/Error";

import { withStyles } from "@material-ui/styles";

import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import SwipeableViews from "react-swipeable-views";

import UploadTab from "../UploadTab";
import { useStyles } from "./styles";

const SNETAudioTabs = ({
  classes,
  allowedInputTypes,
  activeTab,
  displayError,
  errorMessage,
  handleAudioUpload,
  handleClikAway,
  show,
}) => {
  if (!show) {
    return null;
  }
  return (
    <div className={(classes.tabStyle, classes.tabsMainContainer)}>
      <SwipeableViews axis="x" index={activeTab}>
        <div>
          <UploadTab allowedInputTypes={allowedInputTypes} handleAudioUpload={handleAudioUpload} />
        </div>
      </SwipeableViews>
      <ClickAwayListener onClickAway={handleClikAway}>
        <Snackbar
          className={classes.tabsSnackbar}
          open={displayError}
          autoHideDuration={5000}
          TransitionComponent={Slide}
          transitionDuration={300}
          onClose={handleClikAway}
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
};

SNETAudioTabs.propTypes = {
  allowedInputTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  activeTab: PropTypes.bool,
  displayError: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleAudioUpload: PropTypes.func,
};

export default withStyles(useStyles)(SNETAudioTabs);
