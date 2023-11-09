import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import Navigator from "./src/screens/Navigator";
import { StatusBar } from "expo-status-bar";
import { persistor, store } from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/poppins/Poppins-Medium.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer onReady={onLayoutRootView}>
          <StatusBar style="light" />
          <Navigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
