import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Header from "./src/components/Header";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
           header: (props) => <Header {...props} />, 
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
            options={{ title: "Home" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
