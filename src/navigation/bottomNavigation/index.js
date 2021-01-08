import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../../screen/Home';
import {ProfileStack }from '../StackNavigation/index';

const Tab = createBottomTabNavigator();
export default function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ProfileStack') {
            iconName = focused ? 'account-box' : 'account-box-outline';
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunity name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'grey',
        labelStyle: {},
        style: {
          backgroundColor: 'white',

          opacity: 1,
          height: 48,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 30,
          // borderRadius: 18,
          position: 'absolute',
          borderTopWidth: 0,
          borderRadius: 18,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        },
        tabStyle: {height: 40},
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}
