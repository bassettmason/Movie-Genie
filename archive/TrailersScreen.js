import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import MovieQuote from '../components/MovieQuote';

const TrailersScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>Coming Soon</Text>
        <MovieQuote /> 
      </View>
    );
}
export default TrailersScreen;

const styles = StyleSheet.create({
  container :{
     justifyContent: 'center', //Centered vertically
     alignItems: 'center', //Centered horizontally
     flex:1
  }
});