import { View, Text, Image } from "react-native";
import React from "react";
import { ActorCredit } from "../models/movie";
import { baseImageUrl } from "../utils/api";

const ActorCard = ({ actor }: { actor: ActorCredit }) => {
  return (
    <View className="bg-white rounded mr-3 overflow-hidden w-40">
      <Image
        source={{ uri: baseImageUrl + actor.profile_path }}
        className="h-64 w-40 mb-3"
      />

      <View className="p-2">
        <Text
          className="text-black text-base "
          style={{ fontFamily: "Poppins-Bold" }}
        >
          {actor.name}
        </Text>
        <Text
          className="text-black text-sm"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          {actor.character}
        </Text>
      </View>
    </View>
  );
};

export default ActorCard;
