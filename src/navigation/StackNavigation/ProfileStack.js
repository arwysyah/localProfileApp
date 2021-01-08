import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Profile from '../../screen/Profile';
import Camera from '../../screen/Camera';
const Stack = createStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      headerMode='none'
      screenOptions={({route, navigation}) => ({
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation
            .dangerouslyGetState()
            .routes.findIndex((r) => r.key === route.key) > 1
            ? 0
            : undefined,
        ...TransitionPresets.ModalPresentationIOS,
      })}
      mode='Profile'>
      <Stack.Screen
        name='Home'
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Camera'
        component={Camera}
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
export default ProfileStack;
