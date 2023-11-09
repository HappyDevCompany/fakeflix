import { Movie } from "../models/movie";
import { apiKey, baseImageUrl, baseUrl } from "../utils/api";

const commonQueryParams =
  "&language=fr-FR&include_adult=true&include_video=false&sort_by=popularity.desc";

const fetchData = async (path: string, params?: string) => {
  try {
    const query = `?api_key=${apiKey}${commonQueryParams}${params || ""}`;
    const response = await fetch(baseUrl + path + query);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const transformMovies = (movies: Movie[]) => {
  return movies.map((movie: Movie) => {
    if (movie.poster_path) {
      return { ...movie, poster_path: baseImageUrl + movie.poster_path };
    }
    return movie;
  });
};

export const getPopularMovies = async (pageNumber: number) => {
  const response = await fetchData("/movie/popular", `&page=${pageNumber}`);
  return { ...response, results: transformMovies(response.results) };
};

export const getNowPlayingMovies = async (pageNumber: number) => {
  const response = await fetchData("/movie/now_playing", `&page=${pageNumber}`);
  return { ...response, results: transformMovies(response.results) };
};

export const getUpcomingMovies = async (pageNumber: number) => {
  const response = await fetchData("/movie/upcoming", `&page=${pageNumber}`);
  return { ...response, results: transformMovies(response.results) };
};

export const getAnimationsMovies = async (pageNumber: number) => {
  const response = await fetchData(
    "/discover/movie/",
    `&page=${pageNumber}&with_genres=16`
  );
  return { ...response, results: transformMovies(response.results) };
};

export const getScifiMovies = async (pageNumber: number) => {
  const response = await fetchData(
    "/discover/movie/",
    `&page=${pageNumber}&with_genres=878`
  );
  return { ...response, results: transformMovies(response.results) };
};

export const getMovieDetails = async (movieId: string) => {
  let response = await fetchData("/movie/" + movieId);

  return { ...response, poster_path: baseImageUrl + response.poster_path };
};

export const getMovieVideos = async (movieId: string) => {
  let response = await fetchData("/movie/" + movieId + "/videos");

  return response;
};

export const getMovieActorCredits = async (movieId: string) => {
  let response = await fetchData("/movie/" + movieId + "/credits");

  return response;
};

export const getMovieImages = async (movieId: string) => {
  let response = await fetchData("/movie/" + movieId + "/images", '&ude_image_language=null');

  return response;
};
