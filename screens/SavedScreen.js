import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { getFromIndexedDB } from '../utils/storage';
import {AppContext} from "../navigation/AppNavigator";
import MediaList from '../components/MediaList';

const SavedScreen = () => {
  const thisapp = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    fetchTopTenMovies();
  }, [thisapp.refresh]);

  const fetchTopTenMovies = async () => {
    try {
        let topTenMoviesData = await getFromIndexedDB('topTenMovieData');
        let likedListIds = await getFromIndexedDB('likedLists');
        let likedListIdsAsString = likedListIds.map(String);
        let topTenMoviesDataFiltered = topTenMoviesData.filter(playlist => likedListIdsAsString.includes(playlist.id))
        setMovieData(topTenMoviesDataFiltered);
        setLoading(false);
        console.log("Save Screen Refreshed!")
    } catch (error) {
        console.error('Failed to fetch data from IndexedDB', error);
        setLoading(false);
    }
  };

  if(loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
        </View>
    );
  } else {
    return (
      <View style={{flex: 1 }}>
        < MediaList mediaData={movieData}/>
      </View> 
    );
  }
};

export default SavedScreen;
