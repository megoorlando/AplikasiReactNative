import React from 'react';
import {StyleSheet, TouchableOpacity, View, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Whatsapp from 'react-native-vector-icons/Ionicons'
const InputCustome = props => {
  const {nilai, place, iconName, color, iconName2,change} = props;
  return (
    <View style={styles.container}>
      {
        iconName =='logo-whatsapp'?
        <Whatsapp name={iconName} size={20} color={color} style={styles.icon} />
        :
        <Icon name={iconName} size={20} color={color} style={styles.icon} />
      }
      
      <TextInput
        {...props}
        style={styles.textInput}
        value={nilai}
        placeholder={place}
        placeholderTextColor="#deb887"
      />
      <TouchableOpacity onPress={change}>
      <Icon name={iconName2} size={20} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default InputCustome;

const styles = StyleSheet.create({
  container: {
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: Dimensions.get('window').width / 1.2,
    borderBottomWidth: 1,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    paddingRight: Dimensions.get('window').width / 2.8,
  },
});
