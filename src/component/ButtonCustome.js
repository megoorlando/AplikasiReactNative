import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
const ButtonCustome = props => {
  const {text, tutup, press, color, textColor, brd} = props;
  return (
    <TouchableOpacity
      {...props}
      style={[styles.login, {backgroundColor: color, borderWidth: brd}]}
      disabled={tutup}
      onPress={press}>
      <Text style={[styles.teks, {color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustome;

const styles = StyleSheet.create({
  login: {
    marginVertical: 10,
    padding: 10,
    alignSelf: 'center',
    width: Dimensions.get('window').width / 1.2,
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'black',
  },
  teks: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
