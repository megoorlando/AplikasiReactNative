import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import Detail from '../views/Detail';
import RatingDetail from '../views/RatingDetail'

const Stack = createNativeStackNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Rumah"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RatingDetail"
        component={RatingDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackHome;
