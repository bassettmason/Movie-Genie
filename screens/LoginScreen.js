import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import * as traktService from '../services/traktService';
import * as traktInterface from '../services/traktInterface';
import * as fireInterface from '../services/fireInterface';
import * as storage from '../utils/storage'
import { fetchLikedTraktLists } from '../services/fetchLikedTraktLists';

import qs from 'qs';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const handleLoginPress = async () => {
    console.log("login press")
    const authUrl = await traktService.generateAuthUrl();
    console.log("1 " + authUrl)
    Linking.openURL(authUrl);
  };

const handleOpenURL = async (event) => {
  console.log("URL Opened: " + event.url);
  await traktService.setStorageItem("codeurl", event.url);
  let url = new URL(event.url);
  const queryParams = qs.parse(url.search.slice(1));
  const code = queryParams.code;
  await traktService.setStorageItem("code", code);
  if (code) {
    console.log("Got a code:", code);
    const access_token = await traktService.exchangeCodeForToken(code);
    console.log("Got access token:", access_token)
    // Fetch liked lists and store them in the IndexedDB
    if (access_token) {
      const likedLists = await fetchLikedTraktLists();
      if (likedLists) {
        storage.storeInIndexedDB('likedLists', likedLists);
      }
    }
    navigation.navigate('App');
  }
};


const fetchAndStorePlaylistData = async () => {
    try {
        // const topTenMovieData = await traktInterface.getTraktTopTen();
        const topTenFireMovieData = await fireInterface.getFireTopTen();
        // if (discoveryLists) {
        //  storage.storeInIndexedDB('discoveryLists', discoveryLists);
        // } else {
            storage.storeInIndexedDB('discoveryLists', null);
        //}
        // if (topTenMovieData){
        //   storage.storeInIndexedDB('topTenMovieData', topTenMovieData);
        // }
        if (topTenFireMovieData){
          storage.storeInIndexedDB('topTenMovieData', topTenFireMovieData);
        }
        //storage.cacheMovieImages(topTenMovieData);
    } catch (error) {
        console.error('Error fetching and storing movies', error);
    }
};
    
  useEffect(() => {
    fetchAndStorePlaylistData();
    // Add event listener for when the app is opened via a URL
    Linking.addEventListener('url', handleOpenURL);

    // Attempt to get an initial URL in case the app was opened via a URL
    Linking.getInitialURL().then((url) => {
      if (url) handleOpenURL({ url });
    });

    // Clean up on unmount
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/splash.jpg')} style={styles.image}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login With Trakt</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        alignItems: "center",
        padding: 10,
        backgroundColor: "#DDDDDD",
        borderRadius: 5
    },
    buttonText: {
        fontSize: 20,
    }
});

export default LoginScreen;
