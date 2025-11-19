import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import Button from "../components/Button";
import Colors from "../config/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const login = () => {
    if (email === "sid@gmail.com" && password === "1234") {
      Alert.alert("Success", "Login Successful", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    } else {
      Alert.alert("Error", "Invalid Credentials");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center",justifyContent:"center",  }}
      >
        <MaterialIcons name="login" size={40} color="black" style={{marginTop:-35}} />
        <Text style={styles.title}>Login</Text>
      </View>
      <Input placeholder="Email" onChangeText={setEmail} />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={login} />
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
  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
});

export default Login;
