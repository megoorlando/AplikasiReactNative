import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const HeaderCustome = props => {
  const {pressback, header} = props;
  return (
    <View style={{backgroundColor: '#DEB887'}}>
      <View style={styles.head}>
        <TouchableOpacity onPress={pressback}>
          <Icon name="arrow-back-ios" size={30} color={'#fff'} />
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>{header}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderCustome;

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    margin: 30,
    left: -50,
    justifyContent: 'space-around',
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
});
