import React from 'react';
import {AuthStack} from './src/navigation/auth/index';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </>
  );
};
export default App;
