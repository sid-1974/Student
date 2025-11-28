import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import Colors from "../config/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import api from "../api/Api";

const Login = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginhandler = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("api", "login");
      formData.append("email", email ? email : "");
      formData.append("password", password ? password : "");

      const res = await api.post("/login.php", formData);
      setLoading(false);

      if (res.data.status === true) {
        loginUser(res.data);
        Alert.alert("Login Successful", res.data.message);
      } else {
        Alert.alert("Login Failed", res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert("Login Error", "An error occurred during login.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="login"
          size={40}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.title}>Login</Text>
      </View>
      <Input
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={loginhandler}
        disabled={loading} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  icon: {
    marginTop: -35,
  },
  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
});

export default Login;
