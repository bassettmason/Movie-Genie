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
import { fetchLikedTraktLists } from '../../services/fetchLikedTraktLists.js';
import { storeInIndexedDB, getFromIndexedDB } from '../../utils/storage.js';

const Bookmark = ({ item }) => {
  const thisapp = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      const likedLists = await getFromIndexedDB('likedLists');
      if (likedLists && likedLists.includes(parseInt(item.id))) {
        setIsLiked(true);
      }
    };
    checkIfLiked();
  }, [item]);

  const handleBookmark = async () => {
    setIsLoading(true);
    if (!isLiked){
        await likeTraktList(item.id);

        const likedLists = await fetchLikedTraktLists();
        if (likedLists) {
            storeInIndexedDB('likedLists', likedLists);
        }
        if (likedLists.includes(parseInt(item.id))) {
            setIsLiked(true);
        } else {
            console.log("it said its not in the list")
            console.log(likedLists)
            console.log(item.id)
        }
        setIsLoading(false);
    } else {
        await unlikeTraktList(item.id);

        const likedLists = await fetchLikedTraktLists();
        if (likedLists) {
            storeInIndexedDB('likedLists', likedLists);
        }
        if (!likedLists.includes(parseInt(item.id))) {
            setIsLiked(false);
        } else {
            console.log("it said its not in the list")
            console.log(likedLists)
            console.log(item.id)
        }

        setIsLoading(false);
    }
  }

  return (
    <View style={styles.bookmarkContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.maintheme} />
      ) : (
        <TouchableOpacity onPress={handleBookmark}>
          <BookmarkIcon               
            width={22}
            height={28}
            color={isLiked == true ? colors.maintheme : 'white'}
            style={styles.bookmarkIcon}/>
        </TouchableOpacity>
      )}
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
