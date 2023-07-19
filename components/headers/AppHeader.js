import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../themes/colors';

import HamburgerIcon from '../buttonsAndIcons/HamburgerIcon';
import MagicIcon from '../buttonsAndIcons/MagicIcon';

function AppHeader() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const handleSearchChange = (text) => {
    setSearch(text);
    // Implement searching logic if required
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerIconContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <HamburgerIcon width={24} height={24} color={colors.iconcolor} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search list"
          value={search}
          onChangeText={handleSearchChange}
        />
      </View>
      <View style={styles.headerIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Movie Genie')}>
          <MagicIcon width={24} height={24} color={colors.iconcolor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

AppHeader.propTypes = {
  // You can add props validation here if you pass props to this component
};

export default AppHeader;

const styles = StyleSheet.create({
  // Your styles
});
