import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Container from "../components/Container";
import { Movie } from "../models/movie";
import { useSelector } from "react-redux";

import { State } from "../models/state";
import MoviesSection from "../components/MoviesSection";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getAnimationsMovies,
  getScifiMovies,
} from "../services/api_services";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addUpcomingMovies,
  addAnimationMovies,
  addScifiMovies,
} from "../store/moviesSlice";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

const { height } = Dimensions.get("window");

const HomeScreen: React.FC<any> = ({ navigation }: NativeStackHeaderProps) => {
  const {
    popularMovies,
    nowPlayingMovies,
    upcomingMovies,
    animationsMovies,
    scifiMovies,
  } = useSelector((state: State) => state.movies);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-3">
          {popularMovies.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.push("MovieDetails", {
                  movieId: popularMovies[7].id,
                })
              }
              style={{ height: height * 0.5 }}
              className="bg-red-700 mb-5"
            >
              <Image
                source={{ uri: popularMovies[7].poster_path + "" }}
                className="h-full w-full"
                style={{ resizeMode: "cover" }}
              />
            </TouchableOpacity>
          )}

          <MoviesSection
            label={"Tendances Actuelles"}
            movies={popularMovies}
            loadHandler={getPopularMovies}
            dispatchHandler={addPopularMovies}
          />

          <MoviesSection
            label={"Actuellement au cinema"}
            movies={nowPlayingMovies}
            large
            loadHandler={getNowPlayingMovies}
            dispatchHandler={addNowPlayingMovies}
          />

          <MoviesSection
            label={"Ils arrivent bientot"}
            movies={upcomingMovies}
            loadHandler={getUpcomingMovies}
            dispatchHandler={addUpcomingMovies}
          />

          <MoviesSection
            label={"Films d'animations"}
            movies={animationsMovies}
            large
            loadHandler={getAnimationsMovies}
            dispatchHandler={addAnimationMovies}
          />

          <MoviesSection
            label={"Science-Fiction"}
            movies={scifiMovies}
            loadHandler={getScifiMovies}
            dispatchHandler={addScifiMovies}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
