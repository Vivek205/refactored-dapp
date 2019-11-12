import React from "react";
import { connect } from "react-redux";

import StyledButton from "../../../../common/StyledButton";
import { useStyles } from "./styles";
import UserFeedback from "../UserFeedback";
import { modalsActions } from "../../../../../Redux/actionCreators";

const CompletedActions = props => {
  const {
    isComplete,
    feedback,
    orgId,
    serviceId,
    refetchFeedback,
    handleResetAndRun,
    showUserFeedback,
    setUserFeedback,
  } = props;

  const handleOpenUserFeedback = () => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    setUserFeedback(true);
  };

  const handleCloseUserFeedback = () => {
    setUserFeedback(false);
  };

  const classes = useStyles();
  if (!isComplete) {
    return null;
  }
  return (
    <div className={classes.buttonsContainer}>
      <UserFeedback
        open={showUserFeedback}
        handleClose={handleCloseUserFeedback}
        feedback={feedback}
        orgId={orgId}
        serviceId={serviceId}
        refetchFeedback={refetchFeedback}
      />
      <StyledButton type="transparent" btnText="Rate the service" onClick={handleOpenUserFeedback} />
      <StyledButton type="blue" btnText="Reset and Run" onClick={handleResetAndRun} />
    </div>
  );
};

const mapStateToProps = state => ({
  showUserFeedback: state.modalsReducer[modalsActions.FEEDBACK_MODAL],
});

const mapDispatchToProps = dispatch => ({
  setUserFeedback: show => dispatch(modalsActions.setFeedbackModal(show)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedActions);
