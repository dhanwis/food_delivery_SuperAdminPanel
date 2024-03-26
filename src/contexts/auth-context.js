import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "../utils/constant/axiosConfig";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  CREATE_OR_UPDATE_PROFILE: "CREATE_OR_UPDATE_PROFILE",
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
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
  [HANDLERS.CREATE_OR_UPDATE_PROFILE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [admin, setAdmin] = useState({});

  const initialized = useRef(false);
  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      const token = localStorage.getItem("token");

      if (token) {
        dispatch({ type: HANDLERS.INITIALIZE, payload: { token } });
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE,
        });
      }
    } catch (error) {
      console.error("Error initializing authentication:", error);
    }
  };

  useEffect(() => {
    initialize();
    fetchAdminData();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("admin/signIn", { email, password });
      const token = await response.data.token;

      localStorage.setItem("token", token);

      dispatch({ type: HANDLERS.SIGN_IN, payload: token });
    } catch (error) {
      console.error("Sign in failed:", error);
      throw new Error("Sign in failed. Please try again.");
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    dispatch({ type: HANDLERS.SIGN_OUT });
  };

  const fetchAdminData = async () => {
    try {
      // Make GET request to fetch all franchises
      const response = await axios.get("admin/getAdminProfile");
      if (response.status !== 200) {
        throw new Error("Failed to fetch adminData");
      }

      // Extract data from response
      const updatedAdminData = response.data;

      // Optionally transform data
      const transformedAdmin = setAdmin((prevAdmin) => ({
        ...prevAdmin,
        ...updatedAdminData,
        //adminImg: upda.imageUrl ? `${imageUrl}/${franchise.imageUrl}` : null,
      }));

      return transformedAdmin;
    } catch (error) {
      console.error("Error fetching franchises:", error);
      throw error;
    }
  };

  const create_or_updateAdminProfile = async (adminDataToSend) => {
    try {
      const response = await axios.post("admin/create_or_updateAdminProfile", adminDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedAdminData = response.data.adminData;

      // Store updated admin data in localStorage
      //localStorage.setItem("adminData", JSON.stringify(updatedAdminData));
      if (admin) {
        setAdmin((prevAdmin) => ({ ...prevAdmin, ...updatedAdminData }));
      } else {
        setAdmin(updatedAdminData);
      }

      // Dispatch action to update admin profile in context state
      //dispatch({ type: HANDLERS.UPDATE_PROFILE, payload: updatedAdminData });
    } catch (error) {
      console.error("Error updating admin profile:", error);
      throw new Error("Error updating admin profile. Please try again later.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        admin,
        create_or_updateAdminProfile,
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
