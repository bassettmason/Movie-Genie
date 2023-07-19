import React, { useContext } from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import colors from "../../themes/colors";

let BUTTON_SIZE = 28
let BORDER_WIDTH = 0

function CloseButton(props:any){

    // const nav = useContext(SettingsContext);
 

    function handleClose() {
      setTimeout(function () {
        nav.setNavSettings('Settings Main');
      }, 500);
    }

    // if(props.bottomsheet == true) {
    //   BUTTON_SIZE = 32
    //   BORDER_WIDTH = 0
    // } else {
    //   BUTTON_SIZE = 28
    //   BORDER_WIDTH = 0
    // }

  
    return (
        <TouchableOpacity 
          onPress={() => 
           {props.bottomsheet ? (
              props.setOpen(false)
            ) : (
              [props.navigation.closeDrawer(), handleClose()]
            )}
          }
          style={[styles.button,
                  {backgroundColor: colors.lightgrey, 
                  width:BUTTON_SIZE+BORDER_WIDTH,
                  height:BUTTON_SIZE+BORDER_WIDTH,
                  borderWidth:BORDER_WIDTH,
                  borderRadius:BUTTON_SIZE/2, }
                 ]}
        >
          <Icon name={'close'} color={"black"} size={BUTTON_SIZE/1.6} />
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    button:{
        justifyContent:'center',
        alignItems:'center',

    }
})
export default CloseButton;