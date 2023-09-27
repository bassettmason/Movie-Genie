import React, { useState, useEffect } from 'react';
import {
StyleSheet,
View,
Text,
TouchableOpacity,
Image,
Platform
} from 'react-native';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { WebView } from 'react-native-webview';
import colors from "../themes/colors";
import CloseButton from "../components/buttonsAndIcons/CloseButton";
import HeartIcon from "../components/buttonsAndIcons/HeartIcon";

export default function MovieDetails({open, movie, setOpen}) {
  const currentOS = Platform.OS;
  const [poster, setPoster] = useState(null);
  const [genres, setGenres] = useState(null);
  const [rating, setRating] = useState(null);
  const [thisrating, setThisrating] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [runtime, setRuntime] = useState(null);
  const [tagline, setTagline] = useState(null);
  const [youtubeid, setYoutubeid] = useState(null);
  const [youtubelink, setYoutubelink] = useState(null);
  const [rottenPercent, setRottenPercent] = useState(null);

useEffect(() => {
  fetchDetails();
}, [movie]);

const fetchDetails = () => {
  if (movie) {
    const newRuntime = movie.runtime ? movie.runtime : null;
    const newGenres = movie.genres ? movie.genres.join(', ') : null;
    const newThisrating = movie.rating.imdb ? Math.trunc(movie.rating.imdb * 10) : null;
    const newRating = newThisrating ? newThisrating + '%' : null;
    const newHours = newRuntime ? Math.floor(newRuntime / 60) : null;
    const newMinutes = newRuntime ? newRuntime % 60 : null;
    const newRuntimeString = newHours && newMinutes ? `${newHours}h ${newMinutes}m` : null;
    const newTagline = movie.tagline ? movie.tagline : null;
    const newYoutubeid = movie.trailer ? movie.trailer.split("watch?v=").pop() : null;
    const newYoutubelink = newYoutubeid ? `https://www.youtube.com/embed/${newYoutubeid}` : null;

    setGenres(newGenres);
    setThisrating(newThisrating);
    setRating(newRating);
    setHours(newHours);
    setMinutes(newMinutes);
    setRuntime(newRuntimeString);
    setTagline(newTagline);
    setYoutubeid(newYoutubeid);
    setYoutubelink(newYoutubelink);

    if (movie.art.poster) {
      setPoster(movie.art.poster);
    } else if (movie.art.background) {
      setPoster(movie.art.background);
    } else {
      setPoster(null);
    }
  }
};
  
   return (
     <>
      <BottomSheet 
        blocking={false}
        open={open}
        defaultSnap={({ maxHeight }) => maxHeight - 300}
        snapPoints={({ maxHeight }) => [
          maxHeight,
          maxHeight - 100,
          maxHeight - 200,
          maxHeight - 300
        ]}
      >
        {!movie ? (
          <></>
        ) : (
          <View>
            <View style={styles.closeButtonPOS}>
              <CloseButton bottomsheet={true} setOpen={setOpen}/>
            </View>
            <View style={styles.movieDetailsContainer}>
              <Text style={styles.headerText}>{movie.title}</Text>
              <View style={styles.availableContainer}>
                {/*Component with conditions */}
                <View style={styles.availableIcon}/>
              </View>
              <View style={styles.ratingsContainer}>
                <HeartIcon style={styles.traktHeart} 
                  color={colors.red} 
                  height={16} 
                  width={18} 
                  strokecolor={colors.mediumgrey}/>
                <Text style={styles.traktPercent}>{rating}</Text>
                {rottenPercent ? (
                  <>
                    <View style={styles.rottenTomato}/>
                    <Text style={styles.rottenPercent}>44%</Text>
                  </>
                ) : ( 
                  <></>
                )}
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.genreDetailsContainer}>
                  {/*Should I limit this? */}
                  <Text style={styles.title}>Genre: 
                    <Text style={[styles.details, {textTransform: 'capitalize'}]}>{genres}</Text>
                  </Text>
                </View>
                <View style={styles.otherDetailsContainer}>
                  <Text style={styles.title}>Rating: <Text style={styles.details}>{movie.certification}</Text></Text>
                  <Text style={styles.title}>Runtime: <Text style={styles.details}>{runtime}</Text></Text>
                  <Text style={styles.title}>Release Year: <Text style={styles.details}>{movie.year}</Text></Text>
                </View>
              </View>
              {/*Need to ensure there is a tagline*/}
              {tagline ? (
                <Text style={styles.tagline}>{movie.tagline}</Text>
              ) : ( 
                <></>
              )}
              {/*Need a cutoff ... see more */}
              <Text style={[
                styles.description, 
                tagline ? {paddingTop: 15} : {paddingTop: 20}]}>
                {movie.overview}
              </Text>
              
              {movie.trailer ? (
                <View style={styles.trailerContainer}>
                  
                  {currentOS === "web" ? (
                    <iframe 
                      style={styles.iframe}
                      src={youtubelink} 
                      allowFullScreen
                      frameBorder='0'
                    />
                  ) : (
                    <WebView source={{uri: youtubelink}} />
                  )}
                  
                </View>
              ) : ( 
                <></>
              )}
              
              <View style={styles.posterContainer}>
                <Image
                  source={{ uri: poster }}
                  style={styles.poster}
                />
              </View>
            </View>
          </View>
        )}
      </BottomSheet>
    </>
   )
  
}

const styles = StyleSheet.create({
   closeButtonPOS: {
      top: 25,
      right: 25,
      alignItems: 'flex-end',
      height: 0,
      zIndex: 10,
      position: 'fixed'
    },
    movieDetailsContainer: {
      marginHorizontal: 30,
      maxWidth: 500,
      alignSelf: 'center',
    },
    headerText: {
      fontSize: 26,
      fontWeight: 'bold',
      // alignSelf: 'center',
      paddingTop: 20,
      color: colors.darkgrey
    },
    ratingsContainer: {
      paddingTop: 12,
      flexDirection: 'row',
      alignItems: 'center'
    },
    traktPercent: {
      paddingLeft: 4,
      fontSize: 16,
      // fontWeight: 'bold',
      color: colors.darkgrey
    },
    detailsContainer: {
      paddingTop: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
      color: colors.darkgrey
    },
    genreDetailsContainer: {
      width: '100%'
    },
    otherDetailsContainer: {
      paddingTop: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%'
    },
    title: {
      fontWeight: 'bold',
      color: colors.darkgrey
    },
    details: {
      paddingLeft: 5,
      paddingRight: 15,
      color: colors.maintheme
    },
    description: {
      color: colors.darkgrey,
    },
    tagline: {
      paddingTop: 20,
      fontStyle: 'italic',
      color: colors.darkgrey
    },
    trailerContainer: {
      width: '80%',
      // alignItems: 'center',
      // justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '56.25%', /* 16:9 Aspect Ratio */
      marginTop: 40,
      alignSelf: 'center'
    },
    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      maxWidth: 600,
      maxHeight: 420,
    },
    posterContainer: {
      paddingTop: 80,
      paddingBottom: 80,
    },
    poster: {
      width: 270,
      height: 400,
      alignSelf: 'center'  
    }
});