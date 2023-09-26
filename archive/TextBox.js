import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import colors from "../themes/colors";


export default function TextBox({
  thisPlaceHolder, 
  onChangeText, 
  text, 
  thisHeight, 
  thisWidth, 
  inputMode, 
  keyboardType,
  form
}) {

  return (
      <TextInput
        style={[
          styles.input, 
          {height: thisHeight, width: thisWidth, maxWidth: 350}, 
          form ? {textAlign: 'left', padding: 15, textAlignVertical: 'top'} : {textAlign: 'center'}]}
        value={text}
        placeholder={thisPlaceHolder}
        placeholderTextColor={colors.mediumgrey} 
        onChangeText={onChangeText}
        multiline={false}
        returnKeyType={"Submit"}
        inputMode={inputMode}
        keyboardType={keyboardType}
        multiline={form}
      />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.mediumboarder,
    shadowOpacity: 0.24,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 4, width: 4 },
  },  
});