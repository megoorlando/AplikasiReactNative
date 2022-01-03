import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OTP = ({navigation}) => {

  const changeLogin = () => {
    navigation.navigate('Congratulation');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.registercomponent}>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            width: 200,
          }}>
          Please Enter OTP Verification
        </Text>
        <Text
          style={{marginTop: 10, marginLeft: 10, color: 'black', fontSize: 18}}>
          Code was send to your Email
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 10, color: 'black', fontSize: 18}}>
            This code expied in
          </Text>
          <CountDown
            until={10}
            size={15}
            digitStyle={{backgroundColor: 'white', height: 25}}
            digitTxtStyle={{color: 'red'}}
            onFinish={() => alert('Waktu Habis!')}
            timeToShow={['M', 'S']}
          />
        </View>
        <OTPInputView
          style={{width: '100%', height: 120, backgroundColor: 'white'}}
          pinCount={4}
          codeInputFieldStyle={{
            backgroundColor: '#DEB887',
            borderRadius: 10,
            height: 60,
            width: 60,
            color: 'black',
          }}
          codeInputHighlightStyle={{color: 'black'}}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <View style={styles.asking}>
          <Text
            style={{ color: 'black', fontSize: 15}}>
            Didn’t receive an OTP?
          </Text>
          <Text style={{color: 'black'}}>Resend OTP</Text>
        </View>

        <TouchableOpacity
          style={styles.login}
          onPress={changeLogin}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Create your account
          </Text>
        </TouchableOpacity>
      </View>
      {/* 
      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.navigate('SuccesCode')}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Create your account
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  containerotp: {
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 50,
  },
  otpfield: {
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#324A59',
    alignSelf: 'center',
  },
  confirmbutton: {
    height: 35,
    width: 300,
    margin: 20,
    backgroundColor: '#324A59',
    alignSelf: 'center',
    marginVertical: 50,
  },
  registercomponent: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 20,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  login: {
    marginVertical: 20,
    alignSelf: 'center',
    height: 50,
    width: Dimensions.get('window').width / 1.2,
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 12,
    marginTop: 220,
  },
  asking:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});

export default OTP;
