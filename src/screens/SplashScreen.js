import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png')} 
        style={styles.image}
      />
      <Text style={styles.text}>CinemaScout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
  },
  image: {
    width: 150, 
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
});

export default SplashScreen;
