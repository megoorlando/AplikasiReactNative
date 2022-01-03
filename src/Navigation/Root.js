// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/Login'
import Register from '../views/Register'
import TabNav from '../Navigation/TabNav' 
import OTP from '../views/OTP' 
import Congratulation from '../views/Congratulation';
const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="OTP" component={OTP} options={{headerShown:false}}/>
        <Stack.Screen name="Congratulation" component={Congratulation} options={{headerShown:false}}/> 
        
        <Stack.Screen name="TabNav" component={TabNav} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
