import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [serviceData, setServiceData] = useState([]);
  // user admin panel not load without loading state true
  const [loading, setLoading] = useState(true);
  // use user-admin-panel
  const authorizationToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_URI_API;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
  let isLoggedIn = !!token;
  console.log("isLoggedIn ", isLoggedIn);
  // takling the logout functionality
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  // JWT AUTHENTICATION - to get the currenltly loggedIn user data
  const userAuthentication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        // headers: { Authorization: `Bearer ${token}` },
        headers: { Authorization: authorizationToken },
      });
      if (response.ok) {
        // console.log("hhhh response ", response);
        const data = await response.json();
        // console.log("dddd data ", data);
        // console.log("ffff data ", data.userData);
        setUser(data.userData);
        setLoading(false);
      } else {
        console.error("Error fetching user data");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };
  // to fetch the services data from the databse
  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/data/service`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        console.log(data.msg);
        setServiceData(data.msg);
      }
    } catch (error) {
      console.log(`services fronted error ${error}`);
    }
  };
  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        isLoggedIn,
        user,
        serviceData,
        authorizationToken,
        loading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const useContextValue = useContext(AuthContext);
  if (!useContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return useContextValue;
};
