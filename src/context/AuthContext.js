import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigation/navigationRef";


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


  const loginUser = async (userData) => {
    try {
      await AsyncStorage.setItem("token", userData.token);
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify(userData.data)
      );

      setToken(userData.token);
      setUserInfo(userData.data);

   
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
    const storedToken = await AsyncStorage.getItem("token");
    const storedUser = await AsyncStorage.getItem("userInfo");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUserInfo(JSON.parse(storedUser));
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        loginUser,  // <-- IMPORTANT
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
