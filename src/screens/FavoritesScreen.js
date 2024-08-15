import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import MovieCard from '../components/MovieCard';
import {getFavoriteMovies, removeFavorite} from '../services/movieService';
import {theme} from '../theme';
import {useFocusEffect} from '@react-navigation/native';
import {Toast} from 'toastify-react-native'; 

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = useCallback(async () => {
    try {
      const movies = await getFavoriteMovies();
      setFavorites(movies);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  const handleRemoveFavorite = async id => {
    try {
      await removeFavorite(id);
      setFavorites(prevFavorites =>
        prevFavorites.filter(movie => movie.imdbID !== id),
      );
      Toast.success('Movie removed from favorites.');
    } catch (error) {
      Toast.error('Failed to remove movie from favorites.');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.movieCardContainer}>
      <MovieCard title={item.Title} year={item.Year} poster={item.Poster} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item.imdbID)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>
          No favorite movies added yet.
        </Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.imdbID}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.small,
    paddingTop: theme.spacing.medium,
  },
  heading: {
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.medium,
  },
  noFavoritesText: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.large,
  },
  movieCardContainer: {
    margin: theme.spacing.small,
    alignItems: 'center',
  },
  removeButton: {
    padding: theme.spacing.small,
    backgroundColor: theme.colors.iconColour,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.regular,
    fontSize: 16,
  },
  list: {
    paddingBottom: theme.spacing.small,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default FavoritesScreen;
