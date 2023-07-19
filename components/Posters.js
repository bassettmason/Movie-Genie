import React from 'react'
import { View, StyleSheet } from "react-native"
import Carousel from 'react-native-snap-carousel'
import Poster, { SLIDER_WIDTH, ITEM_WIDTH } from './Poster'
import MediaListTitle from "./MediaListTitle";

export default function Posters(props) {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  let data = props.item.items
  let type = props.item.type
  let issaved = props.item.saved
  let saved

  if(issaved == true){
    saved = true;
  } else {
    saved = false;
  }

  return (
    <View>
      <View style={styles.posterContainer}>
        <View style={styles.movieHeaderContainer}>
          <MediaListTitle 
            item={props.item} 
            saved={saved} 
            />
        </View>
        <Carousel
          layout={'stack'}
          layoutCardOffset={18}
          ref={isCarousel}
          data={data}
          renderItem={({item, index}) => (
            <Poster 
              {...props} 
              key={'poster_'+item._ids.trakt+'_'+index} 
              item={item} 
            />
          )}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
          keyExtractor={(item) => {
            return 'poster_'+item._ids.trakt
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  movieHeaderContainer: {
    alignItems: 'flex-start',
    width: ITEM_WIDTH,
    alignSelf: 'center',
    paddingBottom: 20,
    backgrounColor: 'red',
  },
  posterContainer: {
    paddingBottom: 30,
  },
});