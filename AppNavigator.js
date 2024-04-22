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
import { NAV_AUTHENTICATION, NAV_CONDITIONS_FORM, NAV_LURES_FORM, NAV_REQUEST_LURE_FORM } from "./global/global-constants";
import AddLureModal from "./add-lure-modal";

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
          <RootStack.Screen name={NAV_LURES_FORM} component={LuresForm} />
          <RootStack.Screen
            name="ConditionsResults"
            component={ConditionsResults}
          />
          <RootStack.Screen name={NAV_CONDITIONS_FORM} component={ConditionsForm} />
          <RootStack.Screen name={NAV_REQUEST_LURE_FORM} component={AddLureModal} />
          <RootStack.Screen name="LuresResults" component={LuresResults} />
        </RootStack.Navigator>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppNavigator;
