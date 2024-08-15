import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../theme';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Icon name="arrow-back" size={30} color={theme.colors.textPrimary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: '5%', 
    left: '5%',
    zIndex: 1,
  },
});

export default BackButton;
