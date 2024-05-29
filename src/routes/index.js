import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Gerador from "../pages/Gerador";


const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Gerador"
        component={Gerador}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
}
