import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

import { enableScreens } from "react-native-screens";
enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#1A1A1A" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
