import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
  } from "../constants/userConstants";
import axios from "axios";
  
export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/login",
        { email, password },
        config
      ).then(res=>{
        console.log(res,"00000000")
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        // dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
      });
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      // localStorage.setItem("userInfo", JSON.stringify(data));
      // return
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.setItem("userInfo", JSON.stringify(null));
    dispatch({ type: USER_LOGOUT });
  };
  
  export const register = (name, email, password, isSeller) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/register",
        { name, email, password, isSeller },
        config
      ).then(res=>{
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
    
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
      });
  
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
