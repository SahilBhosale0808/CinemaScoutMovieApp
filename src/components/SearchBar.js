import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import {theme} from '../theme';

const SearchBar = ({value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <Icon
        name="search"
        size={20}
        color={theme.colors.iconColour}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search Movie..."
        placeholderTextColor={theme.colors.iconColour}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 20,
    paddingHorizontal: theme.spacing.large,
    marginBottom: theme.spacing.large,
  },
  icon: {
    marginRight: theme.spacing.small,
  },
  input: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
});

export default SearchBar;
