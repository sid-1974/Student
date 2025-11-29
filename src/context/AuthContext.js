import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [msg, setMsg] = useState({
    setInfo: "",
    setError: "",
    setSuccess: "",
    message: "",
  });

  // Helper function to check token expiration
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < (currentTime - 10);
    } catch (error) {
      return true;
    }
  };

  // Schedule automatic logout
  const scheduleTokenExpiryCheck = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expiryTime - currentTime;
      
      if (timeUntilExpiry > 0) {
        setTimeout(() => {
          logoutUser();
          Alert.alert("Session Expired", "Your session has expired. Please log in again.");
        }, timeUntilExpiry);
      } else {
        logoutUser();
      }
    } catch (error) {
      console.log("Error scheduling token expiry:", error);
    }
  };

  const loginUser = async (userData) => {
    try {
      await AsyncStorage.setItem("token", userData.token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(userData.data));

      setToken(userData.token);
      setUserInfo(userData.data);
      scheduleTokenExpiryCheck(userData.token);
    } catch (error) {
      console.log("Storage error", error);
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userInfo");
    setToken(null);
    setUserInfo({});
  };

  const loadUser = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("userInfo");

      if (storedToken && storedUser) {
        if (isTokenExpired(storedToken)) {
          await logoutUser();
          return;
        }
        
        setToken(storedToken);
        setUserInfo(JSON.parse(storedUser));
        scheduleTokenExpiryCheck(storedToken);
      }
    } catch (error) {
      console.log("Error loading user:", error);
      await logoutUser();
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        loginUser,
        logoutUser,
        msg,
        setMsg,
        userInfo,
        setUserInfo,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);