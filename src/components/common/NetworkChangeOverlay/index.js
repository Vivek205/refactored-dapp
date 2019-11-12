import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/styles";

import AlertBox, { alertTypes } from "../AlertBox";
import { useStyles } from "./styles";
import { walletTypes } from "../../../Redux/actionCreators/UserActions";
import { setNetworkChangeOverlay, NETWORK_CHANGE_OVERLAY } from "../../../Redux/actionCreators/ModalsActions";

const accountChangeAlert = {
  header: "Incorrect Metamask Account",
  type: alertTypes.WARNING,
  message: `Kindly check the Address which you have set on Metamask. 
  Please switch it to the registered address to continue using the services.`,
};

const networkChangeAlert = {
  header: "Incorrect Metamask Network",
  type: alertTypes.WARNING,
  message: `Kindly check the network which you have set on Metamask. 
  Please switch it to Mainnet to continue using the services.`,
};

class NetworkChangeOverlay extends Component {
  state = { alert: {} };

  componentDidMount() {
    window.addEventListener("snetMMAccountChanged", this.handleMetaMaskAccountChange);
    window.addEventListener("snetMMNetworkChanged", this.handleMetaMaskNetworkChange);
    this.showMetaMaskConfigMismatchOverlay();
  }

  componentWillUnmount() {
    document.removeEventListener("snetMMAccountChanged", this.handleMetaMaskAccountChange);
    document.removeEventListener("snetMMNetworkChanged", this.handleMetaMaskNetworkChange);
  }

  componentDidUpdate = prevProps => {
    const { wallet } = this.props;
    if (wallet.type !== prevProps.wallet.type) {
      this.showMetaMaskConfigMismatchOverlay();
    }
  };

  showMetaMaskConfigMismatchOverlay = () => {
    const { wallet, setOverlayOpen } = this.props;
    if (wallet && wallet.type !== walletTypes.METAMASK) {
      setOverlayOpen(false);
      this.setState({ alert: {} });
      return;
    }

    const web3Provider = window.ethereum;
    if (!web3Provider) {
      setOverlayOpen(false);
      this.setState({ alert: {} });
      return;
    }

    const sameNetwork = web3Provider.networkVersion === process.env.REACT_APP_ETH_NETWORK;

    if (!sameNetwork) {
      setOverlayOpen(true);
      this.setState({ alert: networkChangeAlert });
      return;
    }

    const sameAddress = web3Provider.selectedAddress.toLowerCase() === wallet.address.toLowerCase();
    setOverlayOpen(!sameAddress);
    this.setState({ alert: accountChangeAlert });
    return;
  };

  handleMetaMaskAccountChange = event => {
    const { wallet, setOverlayOpen } = this.props;
    if (wallet.type !== walletTypes.METAMASK) {
      return;
    }
    const { address: currentAddress } = wallet;
    const {
      detail: { address },
    } = event;
    const sameAddress = address.toLowerCase() === currentAddress.toLowerCase();
    setOverlayOpen(!sameAddress);
    this.setState({ alert: accountChangeAlert });
  };

  handleMetaMaskNetworkChange = ({ detail: { network } }) => {
    const { wallet, setOverlayOpen } = this.props;
    if (wallet.type !== walletTypes.METAMASK) {
      return;
    }
    const sameNetwork = network === process.env.REACT_APP_ETH_NETWORK;
    setOverlayOpen(!sameNetwork);
    this.setState({ alert: networkChangeAlert });
  };

  render() {
    const { classes, openNetworkChangeOverlay } = this.props;
    const { alert } = this.state;
    return (
      <Modal disableBackdropClick open={openNetworkChangeOverlay}>
        <Card className={classes.card}>
          <CardHeader title={<h4>{alert.header}</h4>} />
          <Divider />
          <CardContent>
            <AlertBox type={alert.type} message={alert.message} />
          </CardContent>
        </Card>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
  openNetworkChangeOverlay: state.modalsReducer[NETWORK_CHANGE_OVERLAY],
});

const mapDispatchToProps = dispatch => ({
  setOverlayOpen: show => dispatch(setNetworkChangeOverlay(show)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(NetworkChangeOverlay));
