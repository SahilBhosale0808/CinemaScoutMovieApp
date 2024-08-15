import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OMDB_API_KEY = 'c3d047fc'; 
const BASE_URL = 'https://www.omdbapi.com/';
const FAVORITES_KEY = 'favorite_movies';

// Fetch movies based on a search query
export const fetchMovies = async query => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: query,
        type: 'movie',
        apikey: OMDB_API_KEY,
      },
    });

    if (response.data.Response === 'True') {
      return response.data.Search.slice(0, 10);
    } else {
      throw new Error('No movies found');
    }
  } catch (error) {
    throw new Error('Failed to fetch movies.');
  }
};

export const fetchMoviesWithSameTitle = async genre => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: genre,
        type: 'movie',
        apikey: OMDB_API_KEY,
      },
    });

    if (response.data.Response === 'True') {
      return response.data.Search.slice(0, 5);
    }
    throw new Error('No similar movies found.');
  } catch (error) {
    throw new Error('Failed to fetch similar movies.');
  }
};

// Add movie to favorites
export const addFavorite = async movie => {
  try {
    const favorites = await getFavoriteMovies();
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      const updatedFavorites = [...favorites, movie];
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );
    }
  } catch (error) {
    throw new Error('Failed to add favorite.');
  }
};

// Remove movie from favorites
export const removeFavorite = async id => {
  try {
    const favorites = await getFavoriteMovies();
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    throw new Error('Failed to remove favorite.');
  }
};

// Check if a movie is favorite
export const isFavorite = async id => {
  try {
    const favorites = await getFavoriteMovies();
    return favorites.some(movie => movie.imdbID === id);
  } catch (error) {
    throw new Error('Failed to check favorite status.');
  }
};

// Get all favorite movies
export const getFavoriteMovies = async () => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    throw new Error('Failed to load favorites.');
  }
};

export const fetchMovieDetails = async id => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        i: id,
        apikey: OMDB_API_KEY,
        plot: 'full',
      },
    });

    if (response.data.Response === 'True') {
      return response.data;
    } else {
      throw new Error('Movie details not found');
    }
  } catch (error) {
    throw new Error('Failed to fetch movie details.');
  }
};