import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginContextProvider from './Contex/LoginContextProvider'
import MainRoute from './Navigation/MainRoute';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
      <LoginContextProvider>
        <NavigationContainer>
          <MainRoute/>
        </NavigationContainer>
      </LoginContextProvider>
  );
};

export default Root;

const styles = StyleSheet.create({});
