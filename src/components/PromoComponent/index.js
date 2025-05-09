import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";
import newAIService from "../../assets/images/newAIService.svg";
import pubisherIcon from "../../assets/images/pubisherIcon.svg";
import Routes from "../../utility/constants/Routes";

const PromoComponent = ({ classes }) => {
  return (
    <div className={classes.promoContainer}>
      <div className={classes.promoWrapper}>
        <div className={classes.box}>
          <img src={newAIService} alt="Looking for New AI Service" />
          <div>
            <span>Looking for a different AI Service?</span>
            <p>
              If you have a need for a specific AI service, we would love to know! We will discuss the details with you
              or use the suggestion to incentivize our network.
            </p>
            <a href={`/${Routes.AI_REQUEST_FORM}`} title="Request AI Form" target="_blank" rel="noreferrer">
              request ai form
            </a>
          </div>
        </div>
        <div className={classes.box}>
          <img src={pubisherIcon} alt={`Interested in earning ${process.env.REACT_APP_TOKEN_NAME}?`} />
          <div>
            <span>Interested in earning {process.env.REACT_APP_TOKEN_NAME}?</span>
            <p>
              We've made it fast and easy to publish your own services through AI Publisher. Start earning{" "}
              {process.env.REACT_APP_TOKEN_NAME} tokens by publishing services into AI Marketplace.
            </p>
            <a href="https://publisher.singularitynet.io/" title="Visit AI Publisher" target="_blank" rel="noreferrer">
              visit ai publisher
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(PromoComponent);
