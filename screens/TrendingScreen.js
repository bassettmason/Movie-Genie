import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ActivityIndicator } from 'react-native';
import { getFromIndexedDB } from '../utils/storage';
import {AppContext} from "../navigation/AppNavigator";
import MediaList from '../components/MediaList';

const TrendingScreen = ({ navigation }) => {
  const thisapp = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    fetchTopTenMovies();
  }, [thisapp.refresh]);

  
    const fetchTopTenMovies = async () => {
      try {
          const data = await getFromIndexedDB('topTenMovieData');
          setMovieData(data);
          setLoading(false);
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
      <View style={{flex: 1}}>
        < MediaList mediaData={movieData} />
      </View> 
    );
  }
};
export default TrendingScreen;
