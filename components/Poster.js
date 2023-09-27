import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = 270

const Poster = (props) => {
    const [poster, setPoster] = useState(null);
    let item = props.item;

    useEffect(() => {
      fetchPoster();
    }, []);

  const fetchPoster = () => {

      if(item.art.poster) {
        setPoster(item.art.poster);
      } else if(item.art.background) {
        setPoster(item.art.background);
      } else {
        setPoster(null);
      }
    
  };

  return (
    <View style={styles.container} key={props.index}>
      <TouchableOpacity
        type="submit"  
        onPress={() => [props.setOpen(true), props.setMovie(item)]}
      >
        <Image
          source={{uri: '' + poster}}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 400,
  },
})

export default Poster