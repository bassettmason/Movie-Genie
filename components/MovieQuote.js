import React, { useState, useEffect, useRef } from 'react';
import {
StyleSheet,
View,
Text
} from 'react-native';
import colors from "../themes/colors";
import movieQuotes from "../assets/data/movieQuotes.js";

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * movieQuotes.length);
  return movieQuotes[randomIndex];
};

export default function MovieQuote() {
  const [randomQuote, setRandomQuote] = useState();

  useEffect(() => {
    setRandomQuote(getRandomQuote());
  }, []);

  return (
   <>
   {randomQuote ? (
      <View style={styles.movieQuoteContainer}>
        <Text style={[styles.movieQuoteRow, {fontSize: 18, fontFamily: 'Pacifico-Regular', color: '#FF6347'}]}>"
        {randomQuote.quote}"
       </Text>
      <Text style={[styles.movieQuoteRow, {fontSize: 12, fontStyle: 'italic'}]}>-
        {randomQuote.movie},  {randomQuote.year}
      </Text>
    </View> 
        ) : ( 
          <></>
      )}
    </>
  );
  
}

const styles = StyleSheet.create({
   movieQuoteContainer: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: 300,
      width: '100%',
      height: 60,
      marginTop: 90,
      marginBottom: 10,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    movieQuoteRow: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 33,
      alignSelf: 'center',
      justifyContent: 'center',
    }
  });



