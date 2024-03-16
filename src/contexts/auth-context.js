import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import axios from "../utils/constant/axiosConfig";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
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
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  // const initialize = async () => {
  //   // Prevent from calling twice in development mode with React.StrictMode enabled
  //   if (initialized.current) {
  //     return;
  //   }

  //   initialized.current = true;

  //   let isAuthenticated = false;

  //   try {
  //     isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   if (isAuthenticated) {
  //     const user = {
  //       id: "5e86809283e28b96d2d38537",
  //       avatar: "/assets/avatars/avatar-anika-visser.png",
  //       name: "Anika Visser",
  //       email: "anika.visser@devias.io",
  //     };
  //     dispatch({
  //       type: HANDLERS.INITIALIZE,
  //       payload: user,
  //     });

  //     // try {
  //     //   // Make an API request to fetch user data
  //     //   const response = await axios.get("/getAdminData");

  //     //   if (response.status === 200) {
  //     //     // Update the state with the fetched user data
  //     //     dispatch({
  //     //       type: HANDLERS.INITIALIZE,
  //     //       payload: response.data.user,
  //     //     });
  //     //   } else {
  //     //     throw new Error("Failed to fetch user data");
  //     //   }
  //     // } catch (error) {
  //     //   console.error("Error fetching user data:", error);
  //     // }
  //   } else {
  //     dispatch({
  //       type: HANDLERS.INITIALIZE,
  //     });
  //   }
  // };

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      const user = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: "Anika Visser",
        email: "anika.visser@devias.io",
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });

      const response = await axios.get("/getAdminProfile");

      if (response) {
        if (response.status === 200) {
          // If the user has created their profile, fetch their profile data
          const adminProfile = response.data;

          // Update the authentication state with the user's profile data
          const user = {
            id: adminProfile._id,
            avatar: adminProfile.profileImg,
            name: adminProfile.fname + " " + adminProfile.lname,
            email: adminProfile.emailID,
          };

          dispatch({
            type: HANDLERS.INITIALIZE,
            payload: user,
          });
        } else {
          // If the user has not created their profile, initialize with default login data
          console.error("admin data was missing!");
        }
      }
    } catch (error) {
      console.error("Error initializing:", error);
      // Handle initialization error if necessary
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  // const signIn = async (email, password) => {
  //   // if (email !== "demo@devias.io" || password !== "Password123!") {
  //   //   throw new Error("Please check your email or password");
  //   // }
  //   // try {
  //   //   window.sessionStorage.setItem("authenticated", "true");
  //   // } catch (err) {
  //   //   console.error(err);
  //   // }
  //   // const user = {
  //   //   id: "5e86809283e28b96d2d38537",
  //   //   avatar: "/assets/avatars/avatar-anika-visser.png",
  //   //   name: "Anika Visser",
  //   //   email: "anika.visser@devias.io",
  //   // };
  //   // dispatch({
  //   //   type: HANDLERS.SIGN_IN,
  //   //   payload: user,
  //   // });

  //   try {
  //     // Send login request to backend
  //     const response = await axios.post("/signIn", { email, password });
  //     const token = response.data.token;
  //     // Store JWT token in local storage
  //     //window.sessionStorage.setItem("authenticated", "true");
  //     console.log(response.data);
  //     // dispatch({
  //     //   type: HANDLERS.SIGN_IN,
  //     //   payload: response.data,
  //     // });
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       // Handle authentication error
  //       console.error("Login failed:", error.response.data.message);
  //       // Display error message to the user
  //       setError(error.response.data.message);
  //     } else {
  //       // Handle other types of errors
  //       console.error("Login failed:", error);
  //     }
  //   }
  // };

  const signIn = async (email, password) => {
    try {
      // Send login request to backend
      const response = await axios.post("/signIn", { email, password });
      const token = response.data.token;

      // Store JWT token in local storage
      localStorage.setItem("token", token);
      // Dispatch action to update authentication state
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: response.data.user,
      });
    } catch (error) {
      if (error.response.status === 401) {
        // Handle authentication error
        console.error("Login failed:", error.response.data.message);
        // Display error message to the user
        throw new Error(error.response.data.message);
      } else {
        // Handle other types of errors
        console.error("Login failed:", error);
      }
    }
  };

  // const signUp = async (email, name, password) => {
  //   throw new Error("Sign up is not added bro");
  // };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        //skip,
        signIn,
        //signUp,
        signOut,
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
