import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { MovieImage } from "../models/movie";
import { baseImageUrl } from "../utils/api";

const { width } = Dimensions.get("window");

const ImageCard = ({ image }: { image: MovieImage }) => {
  return (
    <View
      className="bg-white rounded mr-3 overflow-hidden h-64"
      style={{ width: width * 0.8 }}
    >
      <Image
        source={{ uri: baseImageUrl + image.file_path }}
        className="h-64 w-full"
      />
    </View>
  );
};

export default ImageCard;
