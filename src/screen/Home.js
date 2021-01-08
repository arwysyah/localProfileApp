import React, {useEffect} from 'react';
import {View,SafeAreaView,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyle, TOP} from '../styles';
const {container, cardContainer} = globalStyle; //destructuring style for not make reference
const Home = ({navigation}) => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('rootUser');
      if (value !== null) {
        console.log(value);
      } else {
        navigation.replace('Login');
      }
    } catch (e) {
      Alert.alert('Maaf sepertinya ada kesalahan')
    }
  };
  return (
    <SafeAreaView style={container}>
      <View style={{alignItems: 'center', top: TOP}}>
        <View style={cardContainer}></View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
