import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "auth",
  initialState: {
    popularMovies: [],
    nowPlayingMovies: [],
    upcomingMovies: [],
    animationsMovies: [],
    scifiMovies: [],
  },
  reducers: {
    getPopularMovies(state, action) {
      state.popularMovies = action.payload;
    },
    addPopularMovies(state, action) {
      state.popularMovies = [...state.popularMovies, ...action.payload];
    },
    getNowPlayingMovies(state, action) {
      state.nowPlayingMovies = action.payload;
    },
    addNowPlayingMovies(state, action) {
      state.nowPlayingMovies = [...state.nowPlayingMovies, ...action.payload];
    },
    getUpcomingMovies(state, action) {
      state.upcomingMovies = action.payload;
    },
    addUpcomingMovies(state, action) {
      state.upcomingMovies = [...state.upcomingMovies, ...action.payload];
    },
    getAnimationMovies(state, action) {
      state.animationsMovies = action.payload;
    },
    addAnimationMovies(state, action) {
      state.animationsMovies = [...state.animationsMovies, ...action.payload];
    },
    getScifiMovies(state, action) {
      state.scifiMovies = action.payload;
    },
    addScifiMovies(state, action) {
      state.scifiMovies = [...state.scifiMovies, ...action.payload];
    },
  },
});

export const {
  getPopularMovies,
  addPopularMovies,
  getNowPlayingMovies,
  addNowPlayingMovies,
  getUpcomingMovies,
  addUpcomingMovies,
  getAnimationMovies,
  addAnimationMovies,
  getScifiMovies,
  addScifiMovies
} = moviesSlice.actions;

export default moviesSlice.reducer;
