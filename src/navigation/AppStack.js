import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screens } from "./routesConfig";
import Header from "../components/Header";
import PrivateRoute from "../Protected";


const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ header: (props) => <Header {...props} /> }}>
      {screens.map((screen) => (
        <Stack.Screen key={screen.name} name={screen.name} options={{ title: screen.title }}>
          {() => (
            <PrivateRoute allowedRoles={screen.roles}>
              <screen.component />
            </PrivateRoute>
          )}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
}
