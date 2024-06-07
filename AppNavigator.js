import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ConditionsForm from "./screens/ConditionsForm";
import LuresForm from "./screens/LuresForm";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Subscription from "./screens/Subscription";
import ConditionsResults from "./screens/ConditionsResults";
import LuresResults from "./screens/LuresResults";
import Intent from "./screens/payment";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./navigation";
import Authentication from "./authentication/auth";
import { navigationRef } from './global/global-functions'
import { NAV_PAYMENT, 
  NAV_AUTHENTICATION, 
  NAV_CONDITIONS_FORM, 
  NAV_LURES_FORM, 
  NAV_REQUEST_LURE_FORM, 
  NAV_PROFILE, 
  NAV_EDIT_PROFILE,
  NAV_SUBSCRIPTION,
  PUBLISHABLE_KEY } from "./global/global-constants";
import AddLureModal from "./add-lure-modal";
import { StripeProvider } from '@stripe/stripe-react-native';

const RootStack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <SafeAreaProvider>
      <StripeProvider publishableKey={PUBLISHABLE_KEY}>
        <NavigationContainer ref={navigationRef}>
          <RootStack.Navigator
            initialRouteName="Authentication"
            screenOptions={{ headerShown: false }}
          >
            <RootStack.Screen name={NAV_PAYMENT} component={Intent} />
            <RootStack.Screen name={NAV_AUTHENTICATION} component={Authentication} />
            <RootStack.Screen name={NAV_LURES_FORM} component={LuresForm} />
            <RootStack.Screen
              name="ConditionsResults"
              component={ConditionsResults}
            />
            <RootStack.Screen name={NAV_CONDITIONS_FORM} component={ConditionsForm} />
            <RootStack.Screen name={NAV_REQUEST_LURE_FORM} component={AddLureModal} />
            <RootStack.Screen name="LuresResults" component={LuresResults} /> 
            <RootStack.Screen name={NAV_PROFILE} component={Profile} />
            <RootStack.Screen name={NAV_EDIT_PROFILE} component={EditProfile} />
            <RootStack.Screen name={NAV_SUBSCRIPTION} component={Subscription} />
          </RootStack.Navigator>
          <Navigation />
        </NavigationContainer>
      </StripeProvider>
    </SafeAreaProvider>
  );
}

export default AppNavigator;
