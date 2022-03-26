import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    // marginLeft: theme.spacing(10),
    display: "flex",
	justifyContent: "space-evenly",
    width: "80%"
  },
  logo: {
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    // marginLeft: theme.spacing(20),
    "&:hover": {
      borderBottom: "1px solid white",
    },
	justifyContent:"space-between"
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Seller Logistics
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/signin" className={classes.link}>
              SignIn
            </Link>
            <Link to="/signup" className={classes.link}>
              SignUp
            </Link>
            <Link to="/dashboard" className={classes.link}>
              Dashboard
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;