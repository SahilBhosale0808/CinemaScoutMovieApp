import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PlaceholderImage from '../../assets/placeholder-image.png';
import {theme} from '../theme';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.45; 
const POSTER_WIDTH = CARD_WIDTH; 
const POSTER_HEIGHT = POSTER_WIDTH * 1.5; 

const MovieCard = ({title, year, poster, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={poster !== 'N/A' ? {uri: poster} : PlaceholderImage}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.year}>{year}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background, 
    marginVertical: theme.spacing.medium, 
    marginHorizontal: theme.spacing.small, 
    overflow: 'hidden',
    width: CARD_WIDTH,
    alignSelf: 'center',
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  info: {
    padding: theme.spacing.medium, 
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.fonts.regular, 
    fontSize: 16,
    color: theme.colors.textPrimary, 
    textAlign: 'center',
  },
  year: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});

export default MovieCard;
