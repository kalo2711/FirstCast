import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ConditionsForm from "./screens/ConditionsForm";
import LuresForm from "./screens/LuresForm";
import ConditionsResults from "./screens/ConditionsResults";
import LuresResults from "./screens/LuresResults";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./navigation";
import Authentication from "./authentication/auth";
import { navigationRef } from './global/global-functions'
import { NAV_AUTHENTICATION } from "./global/global-constants";

const RootStack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator
          initialRouteName="Authentication"
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name={NAV_AUTHENTICATION} component={Authentication} />
          <RootStack.Screen name="Lures" component={LuresForm} />
          <RootStack.Screen
            name="ConditionsResults"
            component={ConditionsResults}
          />
          <RootStack.Screen name="ConditionsForm" component={ConditionsForm} />
          <RootStack.Screen name="LuresResults" component={LuresResults} />
        </RootStack.Navigator>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppNavigator;
