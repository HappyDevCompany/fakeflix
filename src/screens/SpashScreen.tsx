import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Container from "../components/Container";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { nRed } from "../utils/constants";
import {
  getPopularMovies as getPopularMoviesDis,
  getNowPlayingMovies as getNowPlayingMoviesDis,
  getUpcomingMovies as getUpcomingMoviesDis,
  getAnimationMovies as getAnimationMoviesDis,
  getScifiMovies as getScifiMoviesDis,
} from "../store/moviesSlice";

import {
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getAnimationsMovies,
  getScifiMovies,
} from "../services/api_services";
import { useDispatch } from "react-redux";

const SpashScreen: React.FC<any> = ({ navigation }: NativeStackHeaderProps) => {
  const dispatch = useDispatch();

  const initData = async () => {
    try {
      const requests = [
        getPopularMovies(1),
        getNowPlayingMovies(1),
        getUpcomingMovies(1),
        getAnimationsMovies(1),
        getScifiMovies(1),
      ];

      const responses = await Promise.all(requests);

      responses.forEach((data: any, index: number) => {
        console.log(data);
        switch (index) {
          case 0:
            dispatch(getPopularMoviesDis(data.results));
            break;
          case 1:
            dispatch(getNowPlayingMoviesDis(data.results));
            break;
          case 2:
            dispatch(getUpcomingMoviesDis(data.results));
            break;
          case 3:
            dispatch(getAnimationMoviesDis(data.results));
            break;
          case 4:
            dispatch(getScifiMoviesDis(data.results));
            break;
          default:
            break;
        }
      });

      navigation.replace("Home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <Container>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/images/netflix-name.png")}
          style={{ height: 140, width: 200 }}
        />
        <ActivityIndicator color={nRed} size={"large"} />
      </View>
    </Container>
  );
};

export default SpashScreen;
