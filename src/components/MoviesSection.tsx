import {
  Image,
  VirtualizedList,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Movie } from "../models/movie";
import { useDispatch } from "react-redux";
import { StackActions, useNavigation } from "@react-navigation/native";

const MoviesSection = ({
  label,
  movies,
  large = false,
  loadHandler,
  dispatchHandler,
}: {
  label: String;
  movies: Movie[];
  large?: Boolean;
  loadHandler: (pageNumber: Number) => Promise<any> ;
  dispatchHandler: any;
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
  //   const isCloseToHalf =
  //     layoutMeasurement.width + contentOffset.x >= contentSize.width / 2;
  //   if (isCloseToHalf && !loading) {
  //     loadMoreData();
  //   }
  // };

  const handleEndReached = () => {
    if (!loading) {
      loadMoreData();
    }
  };

  const loadMoreData = async () => {
    if (!loading) {
      console.log("Loading more data...");
      setLoading(true);
      setPage((prev) => prev + 1);

      try {
        const data = await loadHandler(page + 1);
        console.log(data);
        dispatch(dispatchHandler(data.results));
      } catch (error) {
        console.log(error);
        setPage((prev) => prev - 1);
      } finally {
        setLoading(false);
      }
    }
  };

  const getItemCount = () => movies.length;

  const getItem = (data: Movie[], index: any) => data[index];

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieRowCard movie={item} large={large} />
  );

  return (
    <>
      {movies?.length > 0 && (
        <Text
          className="text-white text-lg mb-5 ml-3"
          style={{ fontFamily: "Poppins-Bold" }}
        >
          {label}
        </Text>
      )}

      <VirtualizedList
        className="mb-7"
        data={movies}
        getItemCount={getItemCount}
        getItem={getItem}
        horizontal
        keyExtractor={(item: Movie, index) => item.id.toString() + index}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1} // Vous pouvez ajuster cette valeur
      />
    </>
  );
};

const MovieRowCard = React.memo(
  ({ movie, large = false }: { movie: Movie; large?: Boolean }) => {
    const navigation = useNavigation();

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            StackActions.push("MovieDetails", {
              movieId: movie.id,
            })
          )
        }
        activeOpacity={0.9}
        className={`${large ? "w-52 h-72" : "w-28 h-48"} bg-red-600 mr-3`}
      >
        <Image
          source={{ uri: movie.poster_path + "" }}
          className="h-full w-full object-cover"
        />
      </TouchableOpacity>
    );
  }
);

export default MoviesSection;
