import React, { Component } from "react";
import { signUp, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";

import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";
import RenderForm from "./RenderForm";
import RenderOTP from "./RenderOTP";
import { userActions, loaderActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { alertTypes } from "../../common/AlertBox";
import { signupFormConstraints, singupOtpContraints } from "./validationConstraints";
import snetValidator from "../../../utility/snetValidator";
import { Helmet } from "react-helmet";

class SignUp extends Component {
  state = {
    nickname: "",
    email: "",
    password: "",
    alert: {},
    toBeConfirmed: false,
    otp: "",
  };

  handleNickname = (event) => {
    this.setState({ nickname: event.currentTarget.value });
  };

  handleEmail = (event) => {
    this.setState({ email: event.currentTarget.value.toLowerCase() });
  };

  handlePassword = (event) => {
    this.setState({ password: event.currentTarget.value });
  };

  handleOTP = (event) => {
    this.setState({ otp: event.currentTarget.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ alert: {} });
    const isNotValid = snetValidator(this.state, signupFormConstraints);
    if (isNotValid) {
      this.setState({ alert: { type: alertTypes.ERROR, message: isNotValid[0] } });
      return;
    }
    const { nickname, password, email } = this.state;
    const { startSignupLoader, stopLoader } = this.props;

    startSignupLoader();
    signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          nickname,
        },
      },
    })
      .then(() => {
        this.props.updateNickname(nickname);
        this.setState({ toBeConfirmed: true });
        stopLoader();
      })
      .catch((err) => {
        this.setState({ alert: { type: alertTypes.ERROR, message: err.message } });
        stopLoader();
      });
  };

  handleConfirmSignup = (event) => {
    this.setState({ alert: {} });
    const isNotValid = snetValidator(this.state, singupOtpContraints);
    if (isNotValid) {
      this.setState({ alert: { type: alertTypes.ERROR, message: isNotValid[0] } });
      return;
    }
    const { email, otp } = this.state;
    const { history, updateEmail } = this.props;
    event.preventDefault();
    event.stopPropagation();
    let route = `/${Routes.LOGIN}`;

    confirmSignUp(email, otp)
      .then(() => {
        updateEmail(email);
        history.push(route);
      })
      .catch(() => {
        this.setState({ alert: { type: alertTypes.ERROR, message: "email confirmation failed. Please try again" } });
      });
  };

  handleResendOTP = () => {
    this.setState({ alert: {} });
    const { email } = this.state;
    resendSignUpCode(email)
      .then(() => {
        this.setState({ alert: { type: alertTypes.SUCCESS, message: "code resent successfully" } });
      })
      .catch((err) => {
        this.setState({ alert: { type: alertTypes.ERROR, message: err.message } });
      });
  };

  render() {
    const { nickname, email, password, otp, alert, toBeConfirmed } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.signupMainContainer}>
        <Helmet>
          <meta
            name="description"
            content="Developers & researchers welcome! Join SingularityNET Marketplace to share & utilize ethical AI models. Automate tasks, gain insights, and solve problems with cutting-edge AI."
          />
          <meta
            name="keywords"
            content="decentralized AI, AI monetization, pre-trained AI models, AI marketplace, signup"
          />
        </Helmet>
        <Grid container className={classes.signupMainContent}>
          {toBeConfirmed ? (
            <RenderOTP
              otp={otp}
              handleOTP={this.handleOTP}
              handleResendOTP={this.handleResendOTP}
              handleConfirmSignup={this.handleConfirmSignup}
              alert={alert}
            />
          ) : (
            <RenderForm
              nickname={nickname}
              handleNickname={this.handleNickname}
              email={email}
              handleEmail={this.handleEmail}
              password={password}
              handlePassword={this.handlePassword}
              alert={alert}
              handleSubmit={this.handleSubmit}
            />
          )}
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSignupLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.SIGNUP)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader()),
  updateNickname: (nickname) => dispatch(userActions.updateNickname(nickname)),
  updateEmail: (email) => dispatch(userActions.updateEmail(email)),
});

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(SignUp));
