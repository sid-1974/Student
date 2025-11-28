import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { navigationRef } from "./src/navigation/navigationRef";
import AuthStack from "./src/navigation/AuthStack";
import AppStack from "./src/navigation/AppStack";


function RootNavigator() {
  const { token, loading } = useAuth();

  if (loading) return null; // optional splash

  return token ? <AppStack /> : <AuthStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
