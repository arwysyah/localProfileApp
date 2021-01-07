import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import BottomNavigation from '../bottomNavigation';
import Login from '../../screen/Login';
const Stack = createStackNavigator();
const HomeScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      headerMode="none"
      screenOptions={({route, navigation}) => ({
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation
            .dangerouslyGetState()
            .routes.findIndex((r) => r.key === route.key) > 3
            ? 0
            : undefined,
        ...TransitionPresets.ModalPresentationIOS,
      })}
      mode="modal">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={
          ({headerShown: false},
          {
            ...TransitionPresets.SlideFromRightIOS,
            gestureDirection: 'horizontal-inverted',
          })
        }
      />
    </Stack.Navigator>
  );
};
export default HomeScreen;
