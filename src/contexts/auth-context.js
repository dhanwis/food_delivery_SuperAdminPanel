import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "../utils/constant/axiosConfig";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  CREATE_PROFILE: "CREATE_PROFILE",
  UPDATE_PROFILE: "UPDATE_PROFILE",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  //for authentication true
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;
    console.log("user" + user);
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  //for authentication false
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },

  //for authentication false
  [HANDLERS.CREATE_PROFILE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  // //for authentication false
  // [HANDLERS.UPDATE_PROFILE]: (state, action) => {
  //   const user = action.payload;

  //   return {
  //     ...state,
  //     isAuthenticated: true,
  //     user,
  //   };
  // },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const initialized = useRef(false);

  // Inside the initialize function
  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      const token = localStorage.getItem("token");
      const adminDataProfileData = JSON.parse(localStorage.getItem("adminData"));
      //console.log(adminDataProfileData);
      //console.log(token);

      if (token) {
        // Token exists and is not expired
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: { token: token, adminData: adminDataProfileData },
        });
        console.log("token available");
        console.log(adminDataProfileData);
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE,
        });
        console.log("token not found");
        console.log("admin not found");
      }
    } catch (error) {
      console.error("Error initializing authentication:", error);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  // Inside the signIn function, set token expiration time when creating the token
  const signIn = async (email, password) => {
    try {
      const response = await axios.post("/signIn", { email, password });

      localStorage.setItem("token", response.data.token);
      //localStorage.setItem("adminData", admin);
      //console.log(localStorage.getItem("adminData"));

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: { token: response.data.token },
      });
    } catch (error) {
      console.error("Sign in failed:", error);
      throw new Error("Sign in failed. Please try again.");
    }
  };

  // Inside the signOut function, clear local storage and dispatch SIGN_OUT action
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminData");
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  const createProfile = async (adminData) => {
    try {
      const response = await axios.post("/createAdminProfile", adminData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const adminProfileData = response.data;
      console.log(adminProfileData);
      localStorage.setItem("adminData", JSON.stringify(adminProfileData));

      dispatch({ type: HANDLERS.CREATE_PROFILE, payload: { adminData: adminProfileData } });
    } catch (error) {
      console.error("Error creating admin profile:", error);
      throw new Error("Error creating admin profile. Please try again later.");
    }
  };

  // const updateProfile = async (adminData) => {
  //   try {
  //     // Send a POST request to update the admin profile
  //     const response = await axios.post("/updateAdminProfile", adminData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     //Retrieve the updated admin profile data from the response
  //     const updatedAdminProfileData = response.data;
  //     // Update the relevant fields in the local storage admin data
  //     const storedAdminData = JSON.parse(localStorage.getItem("adminData"));

  //     const updatedStoredAdminData = {
  //       ...storedAdminData,
  //       ...updatedAdminProfileData,
  //     };
  //     // Update the admin profile data in local storage
  //     localStorage.setItem("adminData", JSON.stringify(updatedStoredAdminData));

  //     // Dispatch an action to update the admin profile state in the context
  //     dispatch({ type: HANDLERS.UPDATE_PROFILE, payload: updatedAdminProfileData });
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error updating admin profile:", error);
  //     throw new Error("Error updating admin profile. Please try again later.");
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        createProfile,
        // updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
