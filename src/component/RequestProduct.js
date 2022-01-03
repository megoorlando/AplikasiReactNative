import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import Axios from '../Axios/Config'
const WIDTH = Dimensions.get('window').width;
const RequestProduct = props => {
  const {item} = props;
  return (
    <View style={styles.box}>
      <Image
        source={{uri:Axios.defaults.baseURL+'static/profile/'+item.user_photoprofile}}
        style={{height: 90, width: 90, borderRadius: 50}}
      />
      <Text>{item.rating}</Text>
      <Text
        style={{
          fontFamily: 'Poly-Regular',
          fontSize: 18,
          textAlign: 'center',
        }}>
        {item.user_name} sent a request to you to borrow a {item.category_name}{' '}
        {item.item_name}
      </Text>
      <View style={styles.wrap}>{props.children}</View>
    </View>
  );
};

export default RequestProduct;

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 35,
    borderWidth: 1,
    borderRadius: WIDTH * 0.025,
    borderColor: 'white',
    padding: 15,
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 5,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
});
