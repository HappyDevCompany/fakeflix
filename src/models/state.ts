import { Movie } from "./movie";

export interface State {
  movies: MoviesSection;
}

export interface MoviesSection {
  popularMovies: Movie[];
  nowPlayingMovies: Movie[];
  upcomingMovies: Movie[];
  animationsMovies: Movie[];
  scifiMovies: Movie[];
}
