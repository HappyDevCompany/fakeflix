import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import {
  getMovieActorCredits,
  getMovieDetails,
  getMovieImages,
  getMovieVideos,
} from "../services/api_services";
import Container from "../components/Container";
import { baseImageUrl, transformGenresToText } from "../utils/api";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ActorCredit, Movie, MovieImage, MovieVideo } from "../models/movie";
import YoutubePlayer from "react-native-youtube-iframe";
import { nRed } from "../utils/constants";
import ActorCard from "../components/ActorCard";
import ImageCard from "../components/ImageCard";

const MovieDetailScreen: React.FC<any> = ({
  route,
}: NativeStackHeaderProps) => {
  const { movieId }: any = route.params;
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [movieVideos, setMovieVideos] = useState<MovieVideo[] | null>([]);
  const [movieActors, setMovieActors] = useState<ActorCredit[] | null>([]);
  const [movieImages, setMovieImages] = useState<MovieImage[] | null>([]);
  const [playing, setPlaying] = useState(false);

  const initData = async () => {
    try {
      const requests = [
        getMovieDetails(movieId),
        getMovieVideos(movieId),
        getMovieActorCredits(movieId),
        getMovieImages(movieId),
      ];
      setLoading(true);
      setErrorLoading(false);

      const responses = await Promise.all(requests);

      responses.forEach((data: any, index: number) => {
        console.log(data);
        switch (index) {
          case 0:
            setMovieDetails(data);
            break;
          case 1:
            setMovieVideos(data.results);
            break;
          case 2:
            setMovieActors(data.cast);
            break;
          case 3:
            setMovieImages(data.backdrops);
            break;
          default:
            break;
        }
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorLoading(true);
      console.error(error);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const onStateChange = React.useCallback((state: any) => {
    console.log("state change", state);

    switch (state) {
      case "playing":
        setPlaying(true);
        break;
      case "paused":
        setPlaying(false);
        break;
      case "ended":
        setPlaying(false);
        break;

      default:
        break;
    }
  }, []);

  const togglePlaying = React.useCallback(() => {
    if (movieVideos && movieVideos.length > 0) {
      setPlaying((prev) => !prev);
    }
  }, []);

  return (
    <Container>
      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={nRed} size={"large"} />
        </View>
      )}

      {errorLoading && (
        <View className="flex-1 justify-center items-center">
          <Text
            className="text-white text-base text-center mb-5"
            style={{ fontFamily: "Poppins-Bold" }}
          >
            Erreur survenue lors du changement, verifier votre connexion à
            internet
          </Text>

          <TouchableOpacity
            onPress={() => initData()}
            activeOpacity={0.9}
            className=""
          >
            <MaterialIcons name="refresh" color={"#FFFFFF"} size={50} />
          </TouchableOpacity>
        </View>
      )}

      {!loading && movieDetails && movieVideos && movieActors && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {movieVideos && movieVideos?.length > 0 ? (
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={movieVideos[0].key.toString()}
              onChangeState={onStateChange}
            />
          ) : (
            <View
              className="h-72 w-full bg-red-600 overflow-hidden"
              style={{ height: 200 }}
            >
              <Image
                source={{ uri: movieDetails.poster_path + "" }}
                className="h-full w-full"
              />
            </View>
          )}

          <View className="p-3">
            <Text
              className="text-white text-base mb-3"
              style={{ fontFamily: "Poppins-Bold" }}
            >
              {movieDetails.title}
            </Text>

            <Text
              className="text-gray-500 text-sm mb-3"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Cenres : {transformGenresToText(movieDetails.genres)}
            </Text>

            <View className="flex-row mb-3 gap-x-2 items-center">
              <Text
                className="text-white bg-gray-700 text-xs  p-1 rounded-sm"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                {new Date(movieDetails.release_date.toString()).getFullYear()}
              </Text>

              <Text
                className="text-green-500 text-sm"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                Récommendations à{" "}
                {parseInt((Number(movieDetails.vote_average) * 10).toString())}%
              </Text>
            </View>

            <TouchableOpacity
              onPress={togglePlaying}
              activeOpacity={0.9}
              className="bg-white gaxmb-3 p-1.5 flex-row items-center justify-center rounded mb-2"
            >
              {!playing ? (
                <MaterialIcons name="play-arrow" size={25} color={"#000000"} />
              ) : (
                <MaterialIcons name="pause" size={25} color={"#000000"} />
              )}

              <Text
                className="text-black text-sm ml-1"
                style={{ fontFamily: "Poppins-Bold" }}
              >
                {!playing ? "Voir la bande d'annonce" : "Pause"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              className="bg-gray-700 mb-5 p-1.5 flex-row items-center justify-center rounded"
            >
              <MaterialIcons name="file-download" size={25} color={"#ffffff"} />
              <Text
                className="ml-1 text-sm text-white"
                style={{ fontFamily: "Poppins-Bold" }}
              >
                Télécharger la vidéo
              </Text>
            </TouchableOpacity>

            <Text
              className="text-white text-sm mb-5"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              {movieDetails.overview}
            </Text>

            <Text
              className="text-white text-base mb-3 px-3"
              style={{ fontFamily: "Poppins-Bold" }}
            >
              Casting
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-3 mb-5"
            >
              <View className="w-3" />

              {movieActors &&
                movieActors.map((actor, index) => (
                  <ActorCard key={actor.id + index.toString()} actor={actor} />
                ))}
            </ScrollView>

            <Text
              className="text-white text-base mb-3 px-3"
              style={{ fontFamily: "Poppins-Bold" }}
            >
              Galerie
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-3 mb-5"
            >
              <View className="w-3" />

              {movieImages &&
                movieImages.map((image, index) => (
                  <ImageCard
                    key={image.file_path + index.toString()}
                    image={image}
                  />
                ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default MovieDetailScreen;
