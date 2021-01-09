import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyle, TOP} from '../styles/index';
import {useDispatch} from 'react-redux';
import {SET_SIGNED_IN} from '../redux/action';
const {
  container,
  content,
  title,
  titlePhone,
  textInput,
  commonButton,
  textButton,
  image,
} = globalStyle; // Destructuring saves from creating temporary references for those properties, and from repetitive access of the object.
const realEmail = 'u';
const realPassword = '1';
const Login = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  useEffect(()=>{
    getData()
  })
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('rootUser')
      return jsonValue != null ? navigation.replace('BottomNavigation') : null;
    } catch(e) {
      alert(e)
    }
  }
  
  async function handleSignIn() {
    //use function declaration cause The arrow function returns a new function every time. This causes React to think something has changed in our view, when in fact nothing has.
    try {
      if (email !== realEmail) {
        ToastAndroid.show('Email is not registered', ToastAndroid.SHORT);
      } else if (password !== realPassword) {
        ToastAndroid.show(
          'Incorrect Password',
          ToastAndroid.SHORT,
        );
      } else {
        await storeData({email:email,password:password});
        dispatch(SET_SIGNED_IN({email: email, password: password}));
        await navigation.replace('BottomNavigation');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const storeData = async (value) => {
    try {
      const newValue = JSON.stringify(value)
      await AsyncStorage.setItem('rootUser', newValue);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={container}>
      <View style={content}>
        <View style={{top: TOP}}>
          <ImageBackground
            source={require('../assets/phoneLogin.png')}
            style={image}>
            <Text style={{fontSize: 10, fontWeight: 'bold', left: -22}}>
              Log in
            </Text>
          </ImageBackground>
          <Text style={title}>Enter your email and password to login</Text>
        </View>

        <Text style={titlePhone}>Email</Text>
        <TextInput
          keyboardType="email-address"
          style={textInput}
          placeholder="Email"
          password={password}
          onChangeText={(txt) => setEmail(txt)}
        />
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={textInput}
          placeholder="Password"
          password={password}
          onChangeText={(pswd) => setPassword(pswd)}
        />
      </View>
      <TouchableOpacity style={commonButton} onPress={handleSignIn}>
        <Text style={textButton}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Login;
