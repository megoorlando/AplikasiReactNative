import React from 'react'
import { Alert, Text, TouchableOpacity, StyleSheet,View} from 'react-native'

const AlertDelete = () => {
   const showAlert = () =>{
      Alert.alert(
         'The transaction process is beyond our responsibilty.Do you want to continue?'
      )
   }
   return (
    <View style = {styles.button}>
      <TouchableOpacity onPress = {showAlert} >
         <Text>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress = {showAlert} >
         <Text>Cancel</Text>
      </TouchableOpacity>
    </View>     
   )
}
export default AlertDelete

const styles = StyleSheet.create ({
   button: {
      backgroundColor: '#4ba37b',
      width: 100,
      borderRadius: 50,
      alignItems: 'center',
      marginTop: 100
   }
})