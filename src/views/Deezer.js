import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import Axios from 'axios';
const Deezer = () => {
  const dataUsers = () => {
    useEffect(() => {
      getDataAPi();
    }, []);
  };

  const getDataAPi = () => {
    Axios.get('https://reqres.in/api/users?page=1')
      .then(response => {
        // handle success
        console.log(response.data.data);
        // console.log(response.headers);
        // console.log(response.status);

        setDataUsers(response.data.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };
  const renderUserList = ({item}) => {
    <View style={{flex: 1}}>
      <Image source={{uri: item.avatarZ}} style={{width: 200, height: 200}} />
    </View>;
  };
  return (
    <View>
      <FlatList
        data={dataUsers}
        keyExtractor={item => item.id}
        renderItem={renderUserList}
      />
    </View>
  );
};

export default Deezer;

const styles = StyleSheet.create({});
