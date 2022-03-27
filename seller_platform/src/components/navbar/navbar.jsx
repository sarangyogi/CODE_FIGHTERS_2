import React,{ useEffect } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout,login } from "../../actions/userActions";
import { Button } from "@mui/material";
import {} from "react-router-dom";
import { useNavigate,useHistory } from "react-router-dom";
import axios from "axios";
import { textAlign } from "@mui/system";
import Logo from './logo.jpg'
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
	  justifyContent:"space-between",
    textAlign:"center"
  },
  button:{
    color:"white",
  }
}));

function Navbar() {
  const classes = useStyles();
  // const navigate = useNavigate();
  const history=useHistory()
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;
  // },[])
  const allSteps=useSelector((state)=>state)
  // const userLogin = useSelector((state) => state.userLogin);
  // let { userInfo } = userLogin;
  const userInfo=localStorage.getItem('userInfo')
  console.log(userInfo,allSteps)
  const logoutHandler = async () => {
    dispatch(logout());
    try{
      const responseData=await axios.post("/logout")
        .then(res => {
          // const persons = res.data;
          console.log(res);
          localStorage.removeItem("userInfo");
          // navigate('/signin')
          history.push('/signin')
          // res.redirect('/')
      })
    }
    catch(e){
      console.log(e)
    }
    console.log("User logged Out Successfully!")
  };
  // useEffect(() => {}, [userInfo]);
  // useEffect(async () => {
  //   checkLoggedIn()
  // }, [])
  // const checkLoggedIn = async () => {
  //   if(localStorage.getItem('userInfo')){
  //     const email=localStorage.getItem('userInfo').email
  //     const password=localStorage.getItem('userInfo').password
  //     if (email) {
  //       await dispatch(login(email,password))
  //     }
  //     // userInfo=localStorage.getItem('userInfo')
  //   }
  // }
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar style={{justifyContent:"space-between"}}>
        <Typography variant="h4" className={classes.logo}>
          {/* Seller Logistics */}
          <img src={Logo} alt="Logo" style={{width:"125px"}}/>
        </Typography>
          <div className={classes.navlinks} style={{ alignItems: "center"}}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            {
              userInfo?(
                <Link to="/dashboard" className={classes.link}>
                  Dashboard
                </Link>
              ):(
                console.log(userInfo)
              )
            }
            {
              userInfo?(<Button className={classes.button} style={{color:"white"}}>
                Welcome {userInfo["name"]}
              </Button>
              ):(
                <Link to="/signup" className={classes.link}>
                Signup
              </Link>
            )
            }
            {
              userInfo?(<Link to="/orders" className={classes.link}>
                Orders
              </Link>
              ):null
            }
            {
              userInfo?(<Button className={classes.button} style={{color:"white"}} onClick={logoutHandler}>
                LogOut
              </Button>):(
                <Link to="/signin" className={classes.link}>
                  SignIn
                </Link>
              )
            }
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;