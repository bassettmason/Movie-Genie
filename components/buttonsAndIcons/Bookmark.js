import React, { useState, useEffect, useContext } from 'react';
import {
StyleSheet,
View,
Text,
TouchableOpacity,
ActivityIndicator
} from 'react-native';
import {AppContext} from "../../navigation/AppNavigator";
import { likeTraktList } from '../../services/likeTraktList';
import { unlikeTraktList } from '../../services/unlikeTraktList';
import colors from "../../themes/colors";
import BookmarkIcon from "./BookmarkIcon";
import { storeInIndexedDB, getFromIndexedDB } from '../../utils/storage.js';

const Bookmark = ({ item }) => {
  const thisapp = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let timeout;

  useEffect(() => {
    checkIfLiked();
  }, []);

  useEffect(() => {
  checkIfLiked();
}, [thisapp.refresh]);

  const checkIfLiked = async () => {
    const likedLists = await getFromIndexedDB('likedLists');
    if (likedLists && likedLists.includes(parseInt(item.id))) {
      setIsLiked(true);
    } else {
       setIsLiked(false);
    }
  };

  const handleBookmark = async (item) => {
    // clearTimeout(timeout);
    console.log(item.id);
    let likeListsCurrent = await getFromIndexedDB('likedLists')
    const index = likeListsCurrent.indexOf(parseInt(item.id))
    setIsLiked(!isLiked);
    
    if (!isLiked) {
        likeListsCurrent.push(parseInt(item.id))
        console.log("I liked");
    } else {
        if (index !== -1) {
            likeListsCurrent.splice(index, 1)
            console.log("I unliked")
        }
    }
    
    await storeInIndexedDB('likedLists', likeListsCurrent);
    console.log(likeListsCurrent)
    thisapp.setRefresh(!thisapp.refresh);
    
    if(!isLoading){
      setIsLoading(true);
      timeout = setTimeout(async () => {
          apiCall();
      }, 3000);
    }

  };

  const apiCall = async () => {

      // Check the latest state of isLiked and run the correct function
      try {
        if (!isLiked) {
          await likeTraktList(item.id);
          console.log(item.id);
          console.log("Liked? " + isLiked);
          console.log("ran api, liked list");
        } else {
          await unlikeTraktList(item.id);
          console.log(item.id);
          console.log("Liked? " + isLiked);
          console.log("ran api, unliked list");
        }
      } catch (error) {
        // Handle any error that occurred during the async operation
        console.error(error);
      } finally {
        setIsLoading(false);
      }
  
  };
  
  return (
    <View style={styles.bookmarkContainer}>
        <TouchableOpacity onPress={()=> handleBookmark(item)}>
          <BookmarkIcon               
            width={22}
            height={28}
            color={isLiked == true ? colors.maintheme : 'white'}
            style={styles.bookmarkIcon}/>
        </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  bookmarkContainer: {
    marginTop: 5,
  },
  bookmarkIcon: {
    alignSelf: 'center',
  },
});

export default Bookmark;
