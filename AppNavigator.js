import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ConditionsForm from "./screens/ConditionsForm";
import LuresForm from "./screens/LuresForm";
import ConditionsResults from "./screens/ConditionsResults";
import LuresResults from "./screens/LuresResults";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./navigation";

const RootStack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Lures" component={LuresForm} />
          <RootStack.Screen
            name="ConditionsResults"
            component={ConditionsResults}
          />
          <RootStack.Screen name="Conditions" component={ConditionsForm} />
          <RootStack.Screen name="LuresResults" component={LuresResults} />
        </RootStack.Navigator>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppNavigator;
