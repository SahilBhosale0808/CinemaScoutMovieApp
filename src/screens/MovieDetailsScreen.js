import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  fetchMovieDetails,
  addFavorite,
  removeFavorite,
  isFavorite,
  fetchMoviesWithSameTitle,
} from '../services/movieService';
import {theme} from '../theme';
import {useRoute} from '@react-navigation/native';
import {Toast} from 'toastify-react-native';
import BackButton from '../components/BackButton';
import MovieCard from '../components/MovieCard'; 

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const MovieDetailsScreen = ({navigation}) => {
  const route = useRoute();
  const {movie} = route.params;

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetails(movie.imdbID);
        setMovieDetails(details);

        const favStatus = await isFavorite(movie.imdbID);
        setIsFav(favStatus);

        // Fetch similar movies based on the title
        let similarMoviesList = await fetchMoviesWithSameTitle(movie.Title);
        similarMoviesList = similarMoviesList.filter(
          item => item.imdbID !== movie.imdbID,
        );

        setSimilarMovies(similarMoviesList);
      } catch (error) {
        Toast.error('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie]);

  const handleFavoriteToggle = async () => {
    try {
      if (isFav) {
        await removeFavorite(movie.imdbID);
        setIsFav(false);
        Toast.error('Removed from favorites.');
      } else {
        await addFavorite(movie);
        setIsFav(true);
        Toast.success('Added to favorites.');
      }
    } catch (error) {
      Toast.error('Failed to update favorite status.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.textPrimary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {movieDetails && (
          <>
            <Image
              source={{uri: movieDetails.Poster}}
              style={styles.poster}
              resizeMode="cover"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {movieDetails.Title} ({movieDetails.Year})
              </Text>
              <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={handleFavoriteToggle}>
                <Icon
                  name={isFav ? 'heart' : 'heart-outline'}
                  size={30}
                  color={isFav ? 'red' : theme.colors.textPrimary}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.details, styles.primaryText]}>
              Genre:{' '}
              <Text style={styles.secondaryText}>{movieDetails.Genre}</Text>
            </Text>
            <Text style={[styles.details, styles.primaryText]}>
              Director:{' '}
              <Text style={styles.secondaryText}>{movieDetails.Director}</Text>
            </Text>
            <Text style={[styles.details, styles.primaryText]}>
              IMDb Rating:{' '}
              <Text style={styles.secondaryText}>
                {movieDetails.imdbRating}
              </Text>
            </Text>
            <Text style={[styles.details, styles.primaryText]}>
              Plot:{' '}
              <Text style={styles.secondaryText}>{movieDetails.Plot}</Text>
            </Text>
            <Text style={styles.similarHeading}>Similar Movies</Text>
            {similarMovies.length > 0 ? (
              <FlatList
                data={similarMovies}
                renderItem={({item}) => (
                  <MovieCard
                    title={item.Title}
                    year={item.Year}
                    poster={item.Poster}
                    onPress={() =>
                      navigation.navigate('MovieDetails', {movie: item})
                    }
                  />
                )}
                keyExtractor={item => item.imdbID}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarMoviesList}
              />
            ) : (
              <Text style={styles.noSimilarMovies}>No Similar Movies</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: screenWidth * 0.05, 
    paddingVertical: screenHeight * 0.02,
  },
  poster: {
    width: '100%',
    height: screenHeight * 0.4,
    marginBottom: screenHeight * 0.02,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight * 0.01,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: screenWidth * 0.06,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  details: {
    fontFamily: theme.fonts.regular,
    fontSize: screenWidth * 0.04, 
    color: theme.colors.textSecondary,
    marginBottom: screenHeight * 0.01,
  },
  primaryText: {
    color: theme.colors.textPrimary,
  },
  secondaryText: {
    color: theme.colors.textSecondary,
  },
  favoriteIcon: {
    marginLeft: screenWidth * 0.02,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  similarHeading: {
    fontFamily: theme.fonts.bold,
    fontSize: screenWidth * 0.05,
    color: theme.colors.textPrimary,
    marginVertical: screenHeight * 0.02,
  },
  similarMoviesList: {
    paddingBottom: screenHeight * 0.02,
  },
  noSimilarMovies: {
    fontFamily: theme.fonts.regular,
    fontSize: screenWidth * 0.04,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginVertical: screenHeight * 0.02,
  },
});

export default MovieDetailsScreen;
