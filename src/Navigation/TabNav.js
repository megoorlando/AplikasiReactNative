import React from 'react'
import { StyleSheet} from 'react-native'
import {createBottomTabNavigator} from  '@react-navigation/bottom-tabs'
import StackHome from '../Navigation/StackHome';
import Account from '../Navigation/StackAkun'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Notif from '../views/Notif'

const Tab = createBottomTabNavigator();
const TabNav = () => {
    return (
        <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = focused ? 'home': 'home';
              size = focused ? 40 : 20;
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications-active' : 'notifications';
              size = focused ? 40 : 20;
            }
            else{
                iconName = focused ? 'account-circle' : 'person';
                size = focused ? 40 : 20;
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#DEB887',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
                <Tab.Screen name='Home' component={StackHome} options={{headerTitleAlign:'center'}}/>
                <Tab.Screen name='Notification' component={Notif} options={{headerTitleAlign:'center'}}/>
                <Tab.Screen name='Account' component={Account} options={{headerTitleAlign:'center'}}/>      
            </Tab.Navigator>
    )
}
export default TabNav

const styles = StyleSheet.create({})
