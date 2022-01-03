import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const Opening = () => {
  return (
    <View style={styles.header}>
      <Image
        style={{
          resizeMode: 'cover',
          width: 125,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        source={require('../assets/logo.png')}
      />
      <Text style={{color: '#000000', fontSize: 19, fontWeight: 'bold'}}>
        PINJEM KETEMUAN DEAL
      </Text>
    </View>
  );
};

export default Opening;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
