import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Auth } from "aws-amplify";

import Logo from "../../../assets/images/Logo.png";
import { useStyles } from "./styles";
import { NavData } from "./data";
import NavBar from "./NavBar";
import HeaderActions from "./HeaderActions";
import Title from "./Title";

const Header = () => {
    const classes = useStyles();
    const [isLoggedIn, toggleLoggedIn] = useState(false);

    Auth.currentAuthenticatedUser({ bypassCache: true }).then(data => {
        if (data === null || data === undefined) {
            toggleLoggedIn(false);
        }
        toggleLoggedIn(true);
    });

    const handleSignOut = () => {
        Auth.signOut()
            .then(data => {
                toggleLoggedIn(false);
            })
            .catch(err => console.log("signout", err));
    };

    return (
        <Grid container spacing={24}>
            <header className={classes.header}>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <Title Logo={Logo} title="SingularityNET" />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <NavBar data={NavData} />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <HeaderActions isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
                </Grid>
            </header>
        </Grid>
    );
};

export default Header;
