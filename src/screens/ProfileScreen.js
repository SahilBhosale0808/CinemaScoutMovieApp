import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Toast} from 'toastify-react-native';
import {theme} from '../theme';
import ProfilePicture from '../components/ProfilePicture'; 
import BackButton from '../components/BackButton'; 

// Sample profile picture and user name
const profilePicture = require('../../assets/avatar.jpeg'); 
const userName = 'Sahil';

const ProfileScreen = ({navigation}) => {
  const handleLogout = () => {
    Toast.success('Logged out successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.profileContainer}>
        <ProfilePicture uri={profilePicture} />
        <Text style={styles.userName}>{userName}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  userName: {
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.medium,
  },
  logoutButton: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.iconColour,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.regular,
    fontSize: 16,
  },
});

export default ProfileScreen;
