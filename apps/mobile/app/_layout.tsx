import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import {Slot} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { colorScheme } from "nativewind";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import "../global.css";
import ReactQueryProvider from "@/components/providers/query-client-provider";
import {Appearance, ImageBackground} from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
colorScheme.set("dark");

export default function RootLayout() {


  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ReactQueryProvider>
      <GluestackUIProvider style={{backgroundColor: "black"}}>
          <ThemeProvider
              value={colorScheme.get() === "dark" ? DarkTheme : DefaultTheme}
          >
              <Slot/>
          </ThemeProvider>
      </GluestackUIProvider>
    </ReactQueryProvider>
  );
}
