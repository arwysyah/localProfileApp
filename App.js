import React from 'react';
import HomeScreen from './src/navigation/auth/index';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </>
  );
};
export default App;
