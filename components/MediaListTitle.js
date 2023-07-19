import React, { useState, useEffect, useRef } from 'react';
import {
Dimensions,
StyleSheet,
View,
Text,
TouchableOpacity,
Image,
FlatList
} from 'react-native';
import colors from "../themes/colors";
import Bookmark from "./buttonsAndIcons/Bookmark";

export default function MovieHeader({item, saved}) {

  //Clean up clean up everybody everywhere
  let finalname;
  
  if(item.name.includes('topten')){
    finalname = item.name.replace(/topten/gi,'');
  } else {
    finalname = item.name
  }

  if(item.name.includes('amazon prime')) {
    finalname = 'prime video'
  }

  if(item.name.includes('hbo')) {
    finalname = 'Max'
  }
  
  return (
    <View style={styles.summaryHeader}>
      <Bookmark 
        saved={saved} 
        item={item} 
        />
        <Text style={styles.summaryTitle}>{finalname}</Text> 
    </View>
  );
}


const styles = StyleSheet.create({
  summaryHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 50,
  },
  summaryTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: colors.mediumgrey,
    textTransform: 'capitalize',
  }
});