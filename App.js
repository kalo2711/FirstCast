import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import AppNavigator from "./AppNavigator";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "sf-light": require("./assets/fonts/SF-Pro-Text-Bold.ttf"),
        "sf-regular": require("./assets/fonts/SF-Pro.ttf"),
        "sf-medium": require("./assets/fonts/SF-Pro-Text-Semibold.ttf"),
        "sf-bold": require("./assets/fonts/SF-Pro-Text-Bold.ttf"),
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
  },[fontLoaded])

  return <AppNavigator />;
}
