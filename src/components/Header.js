import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { GoMarkGithub } from "react-icons/go";
// import { FaFacebook } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  title: {
    ...theme.typography.h6,
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title}>Covid Tracker</Typography>
        {/* <IconButton>
          <FaFacebook color="white" />
        </IconButton> */}
        <IconButton
          href="https://github.com/maanizfar/covid-tracker"
          target="_blank"
        >
          <GoMarkGithub color="white" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
