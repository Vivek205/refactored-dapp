import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

import Grid from "@mui/material/Grid";
import isEmpty from "lodash/isEmpty";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import AboutService from "./AboutService";
import InstallAndRunService from "./InstallAndRunService";
import NotificationBar, { notificationBarTypes } from "../common/NotificationBar";

import { fetchTrainingModel, fetchServiceDetails } from "../../Redux/actionCreators/ServiceDetailsActions";
import {
  pricing as getPricing,
  serviceDetails as getServiceDetails,
  groupInfo as getGroupInfo,
} from "../../Redux/reducers/ServiceDetailsReducer";

import ErrorBox from "../common/ErrorBox";
import SeoMetadata from "../common/SeoMetadata";
import Routes from "../../utility/constants/Routes";
import CardImg from "../../assets/images/SnetDefaultServiceImage.png";
import TrainingModels from "./TrainingModels";

export const HERO_IMG = "hero_image";

const offlineNotication = {
  type: notificationBarTypes.WARNING,
  message: "Service temporarily offline by the provider. Please check back later.",
};

const ServiceDetails = ({ classes }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { orgId, serviceId, tabId } = useParams();

  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);
  const training = useSelector((state) => state.serviceDetailsReducer.detailsTraining);
  const service = useSelector((state) => getServiceDetails(state, orgId, serviceId));
  const groupInfo = useSelector((state) => getGroupInfo(state));
  const pricing = useSelector((state) => getPricing(state));
  const loading = useSelector((state) => state.loaderReducer.app.loading);

  const [activeTab, setActiveTab] = useState(tabId ? tabId : 0);

  useEffect(() => {
    setActiveTab(tabId);
  }, [tabId]);

  useEffect(() => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    if (isEmpty(service) || !service) {
      dispatch(fetchServiceDetails(orgId, serviceId));
    }
    dispatch(fetchTrainingModel(orgId, serviceId));
  }, [dispatch]);

  const handleTabChange = (activeTab) => {
    if (window.location.href.indexOf("#demo") > -1) {
      navigate(location.pathname);
    }
    navigate(location.pathname.split("tab/")[0] + "tab/" + activeTab); //TODO
    setActiveTab(activeTab);
  };

  const handleDemoClick = () => {
    navigate({ ...location, hash: Routes.hash.SERVICE_DEMO });
  };

  if (isEmpty(service)) {
    // || !isEmpty(alert)) {
    if (loading) {
      return null;
    }
    return (
      <Grid container className={classes.serviceDetailContainer}>
        <ErrorBox />
      </Grid>
    );
  }

  const isTrainingAvailable =
    process.env.REACT_APP_TRAINING_ENABLE === "true" && Object.keys(training).length && isLoggedIn;

  const tabs = [
    {
      name: "About",
      activeIndex: 0,
      tabId: "serviceDemo",
      component: (
        <AboutService
          service={service}
          serviceAvailable={service.is_available}
          // scrollToView={scrollToView}
          demoComponentRequired={!!service.demo_component_required}
          isTrainingAvailable={isTrainingAvailable}
        />
      ),
    },
    {
      name: "Install and Run",
      tabId: "serviceGuides",
      activeIndex: 1,
      component: <InstallAndRunService service={service} groupId={groupInfo.group_id} />,
    },
  ];

  if (isTrainingAvailable) {
    tabs.push({
      name: "Models",
      tabId: "serviceTraining",
      activeIndex: 2,
      component: <TrainingModels service={service} groupId={groupInfo.group_id} />,
    });
  }

  const seoURL = `${process.env.REACT_APP_BASE_URL}/servicedetails/org/${orgId}/service/${serviceId}`;
  return (
    <div>
      <Helmet>
        <title>{service.display_name}</title>
        <meta name="keywords" content={service.display_name} />
        <meta name="description" content={service.short_description} />
      </Helmet>
      <SeoMetadata
        title={service.display_name}
        description={service.short_description}
        image={service.org_assets_url ? service.org_assets_url.hero_image : CardImg}
        url={seoURL}
        keywords={service.tags}
      />
      <Grid container className={classes.serviceDetailContainer}>
        <div className={classes.notificationBar}>
          <NotificationBar
            type={offlineNotication.type}
            showNotification={!service.is_available}
            icon={ErrorOutlineIcon}
            message={offlineNotication.message}
          />
        </div>
        <div className={classes.TopSection}>
          <TitleCard
            organizationName={service.organization_name}
            display_name={service.display_name}
            service={service.media}
            orgImg={service.org_assets_url && service.org_assets_url.hero_image}
            star_rating={service.service_rating && service.service_rating.rating}
            totalRating={service.service_rating ? service.service_rating.total_users_rated : 0}
            shortDescription={service.short_description}
          />
          <PricingDetails serviceAvailable={service.is_available} pricing={pricing} handleDemoClick={handleDemoClick} />
        </div>
        <StyledTabs tabs={tabs} activeTab={Number(activeTab)} onTabChange={handleTabChange} />
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(ServiceDetails);
