import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Akun from '../views/Akun';
import Input from '../views/Input';
import Request from '../views/Request';
import RatingRenter from '../views/RatingRenter';
import ProfileSetting from '../views/ProfileSetting';
import EditItem from '../views/EditItem';
const Stack = createNativeStackNavigator();
const StackAkun = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Akun"
        component={Akun}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Input"
        component={Input}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Request"
        component={Request}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RatingRenter"
        component={RatingRenter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItem}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackAkun;
