import { View, Text, Image } from "react-native";
import React from "react";
import HomeScreen from "./HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "./MovieDetailsScreen";
import { nblack } from "../utils/constants";
import SpashScreen from "./SpashScreen";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: nblack,
        },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SpashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Image
              source={require("../../assets/images/netflix-logo.png")}
              className="h-7 w-7"
            />
          ),
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{
          title: "",
          headerTintColor: "#FFFFFF"
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
