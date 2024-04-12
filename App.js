import { StatusBar } from "expo-status-bar";
import { loadTranslations } from "./global/localization.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";

import AppNavigator from "./AppNavigator";

export default function App() {
  return <AppNavigator />;
}
