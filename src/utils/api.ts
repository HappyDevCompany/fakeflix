import { Genre } from "../models/movie";

export const apiKey = process.env.EXPO_PUBLIC_API_KEY;
export const baseUrl = "https://api.themoviedb.org/3";
export const baseImageUrl = "https://image.tmdb.org/t/p/w500/";
export const baseVideoUrl = "https://www.youtube.com/watch?v=";

export function transformGenresToText(genres: Genre[]) {
  if (!genres || !Array.isArray(genres)) {
    return "";
  }

  const genreNames = genres.map((genre) => genre.name);

  return genreNames.join(", ");
}
