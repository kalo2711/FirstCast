import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import AppNavigator from "./AppNavigator";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "open-sans-light": require("./assets/fonts/OpenSans-Light.ttf"),
        "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-medium": require("./assets/fonts/OpenSans-Medium.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        // Add more font variations if needed
      });
    };
  
    const loadAsyncData = async () => {
      await loadFonts();
      setFontLoaded(true);
    };
  
    loadAsyncData();
    if (!fontLoaded) {
      setFontLoaded(true)
    }
  })

  return <AppNavigator />;
}
