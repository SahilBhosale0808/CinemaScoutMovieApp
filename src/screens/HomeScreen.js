import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MovieCard from '../components/MovieCard';
import useMovies from '../hooks/useMovies';
import SearchBar from '../components/SearchBar';
import {theme} from '../theme';
import ProfilePicture from '../components/ProfilePicture';

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {movies, loading} = useMovies(searchQuery);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome Sahil 👋</Text>
          <Text style={styles.subtitleText}>
            Let's relax and explore about a movie!
          </Text>
        </View>
        <ProfilePicture /> 
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      <Text style={styles.heading}>Popular Movies</Text>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.textPrimary} />
      ) : (
        <FlatList
          data={movies}
          renderItem={({item}) => (
            <MovieCard
              title={item.Title}
              year={item.Year}
              poster={item.Poster}
              onPress={() => navigation.navigate('MovieDetails', {movie: item})}
            />
          )}
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
    paddingHorizontal: theme.spacing.medium,
    paddingTop: theme.spacing.large,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  textContainer: {
    // Style for text container
  },
  welcomeText: {
    fontFamily: theme.fonts.regular,
    fontSize: 18,
    color: theme.colors.textPrimary,
  },
  subtitleText: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  heading: {
    fontFamily: theme.fonts.bold,
    fontSize: 25,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.medium,
  },
  list: {
    paddingBottom: theme.spacing.large,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: -5,
  },
});

export default HomeScreen;
