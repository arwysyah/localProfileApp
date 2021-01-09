import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Image, Text} from 'react-native';
import {globalStyle, height} from '../styles';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {container, cardContainer, imageProfile, avatarContainer} = globalStyle; //destructuring style for not make reference

const Home = () => {
  const [email, setEmail] = useState('');
  const globalState = useSelector((state) => state);
  const profileImage = globalState.photo;
  //not using reselect cause will overkill on this project

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('rootUser');
      let newVal = jsonValue !== null ? JSON.parse(jsonValue) : null;
      setEmail(newVal.email);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <SafeAreaView style={container}>
      <View style={{alignItems: 'center', top: height * 0.4}}>
        <View
          style={[
            cardContainer,
            {justifyContent: 'space-evenly', flexDirection: 'row'},
          ]}>
          <View style={avatarContainer}>
            <Image
              style={imageProfile}
              source={
                profileImage === null
                  ? require('../assets/avatar.jpg')
                  : {uri: profileImage}
              }
              resizeMode="cover"
            />
          </View>
          <Text
            style={{
              textTransform: 'capitalize',
              fontSize: 20,
              fontWeight: 'bold',
              top: 33,
              left: -14,
            }}>
            {email}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
