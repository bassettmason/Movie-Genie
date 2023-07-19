import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Animated, 
} from 'react-native';

import {AppContext} from "../navigation/AppNavigator";
import SubScreenMediaDetails from "../screens/SubscreenMediaDetails.js";
import Poster, { ITEM_WIDTH } from './Poster'
import Posters from './Posters';

function NoLists() {
  return (
    <View style={styles.center}>
      <View>
        <Text style={{fontSize: 17}}>No lists were found 🎥</Text>
      </View>
    </View>
  );
}



const MediaList = (mediaData) => {

  const thisapp = useContext(AppContext);
  const [data, setData] = useState()
  const [open, setOpen] = useState(false)
  const [movie, setMovie] = useState(null)
  const [animatedImg, setAnimatedImg] = useState(null)
  
  const pos = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  let endValue = .01;
  const duration = 500;

  useEffect(() => {
    setData(mediaData.mediaData);
  }, []);
  
  useEffect(() => {
    fetchAnimatedImg();
  }, [movie]);

  useEffect(() => {
    setData(mediaData.mediaData);
  }, [mediaData]);
  
  useEffect(() => {
    setData(mediaData.mediaData);
  }, [thisapp.refresh]);

    const fetchAnimatedImg = () => {
      if(movie){
        if(movie._images.moviebackground != null){
          setAnimatedImg(movie._images.moviebackground);
        } else if (movie._images.movieposter != null) {
          setAnimatedImg(movie._images.movieposter);
        } else {
          //add splash image
          setAnimatedImg(null);
        }
      }
    }

  useEffect(() => {
    Animated.timing(pos, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [pos]);
  
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [opacity]);
  
  function scalePoster() {
    Animated.timing(opacity, {   
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();    
    
    Animated.timing(pos, {   
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  function resetPoster() {
    Animated.timing(opacity, {   
      toValue: 0.01,
      duration: 200,
      useNativeDriver: true,
    }).start(); 
    Animated.timing(pos, {   
      toValue: 0.01,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    if(open && movie){
      endValue = .01;
      scalePoster();
    } else {
      endValue = .3;
      resetPoster();
    }
  }, [open]);


  return (
    <View style={{flex: 1}}>
      <View style={styles.savedContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 80, marginTop: 20, flexGrow: 1 }}
          columnWrapperStyle={styles.row}
          numColumns={1}
          data={data}
          renderItem={(props) => {
            return (
              <Posters 
                {...props} 
                setOpen={setOpen} 
                setMovie={setMovie} 
              />
            );
          }}
          keyExtractor={(item) => {
            if (item.id) {
              return item.id.toString();
            } else if (item.ids) {
              return item.ids.trakt.toString();
            }
            // Return a default key if neither item.id nor item.ids.trakt is present
            return 'defaultKey';
          }}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          extraData={data}
          ListEmptyComponent={<NoLists/>}
        />
      </View>
      {movie ? (
          <Animated.Image
            source={{ uri: animatedImg }}
            style={[styles.imageOpen, {
              opacity: opacity,
              transform: [
                {scale: pos,
                }
              ]
          }]}
          />
        ) : ( 
          <></>
      )}
      <SubScreenMediaDetails open={open} movie={movie} setOpen={setOpen}/>
    </View>
  );
}

const styles = StyleSheet.create({
  center :{
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 'auto',
    flex:1
  },
  savedContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  currentposter: {
    width: '100%',
    height: 400,
    position: 'fixed',
    top: 0,
    alignSelf: 'center'  
  },
  imageOpen: {
    width: '100%',
    height: 400,
    position: 'fixed',
    top: 0,
    alignSelf: 'center',
  },
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

export default MediaList;