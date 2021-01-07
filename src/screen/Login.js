import React, {useState} from 'react';
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

  async function handleSignIn() {
    //use function declaration cause The arrow function returns a new function every time. This causes React to think something has changed in our view, when in fact nothing has.
    try {
      if (email !== realEmail) {
        ToastAndroid.show('Email yang anda masukkan salah', ToastAndroid.SHORT);
      } else if (password !== realPassword) {
        ToastAndroid.show(
          'Password yang anda masukkan salah',
          ToastAndroid.SHORT,
        );
      } else {
        const token = 'AxJXsagZJXAHSJASHHEbbKSJDdwak';
        await storeData(token);
        await navigation.replace('BottomNavigation');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('rootUser', value);
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
            <Text style={{fontSize: 10, fontWeight: 'bold', left: -20}}>
              Login
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
      <TouchableOpacity style={[commonButton]} onPress={handleSignIn}>
        <Text style={textButton}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Login;
