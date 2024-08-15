import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native'; 

const ProfilePicture = ({onPress}) => {
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Profile')} 
    >
      <Image
        source={require('../../assets/avatar.jpeg')} 
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#F27807',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ProfilePicture;
