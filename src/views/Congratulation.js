import React from 'react';
import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Congratulation = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.color1}>
        <View style={styles.color2}>
          <View>
            <Icon name="check" size={150} color={'white'}></Icon>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.teks}>Congratulation !!!</Text>
        <Text style={{textAlign: 'center'}}>
          Your Account have been create{' '}
        </Text>
      </View>
      <View style={styles.buttonstyle}>
        <Pressable
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Congratulation;

const styles = StyleSheet.create({
  color1: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 4,
    backgroundColor: '#FFA451',
    borderRadius: Dimensions.get('window').width / 4,
  },
  color2: {
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').height / 5,
    backgroundColor: '#ECAE76',
    borderRadius: Dimensions.get('window').width / 5,
    margin: 20,
  },
  teks: {marginTop: 30, textAlign: 'center', fontWeight: 'bold', fontSize: 30},
  buttonstyle: {
    backgroundColor: '#ECAE76',
    marginTop: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
  },
});
