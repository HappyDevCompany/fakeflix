import { View, Text } from "react-native";
import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

const Container: React.FC<any> = ({ children }: any) => {
  return <View className="flex-1 bg-black">{children}</View>;
};

export default Container;
