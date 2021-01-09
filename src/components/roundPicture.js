import React from 'react';
import {View, Text, Image} from 'react-native';
import {globalStyle, width, height} from '../styles/index';
import {useSelector} from 'react-redux';
const {imageWrapper, profilImageBigger} = globalStyle;
const RoundPicture = () => {
  const globalState = useSelector((state) => state);
  const profileImage = globalState.photo;
  return (
    <View style={imageWrapper}>
      <Image
        source={
          profileImage === null
            ? require('../assets/avatar.jpg')
            : {uri: profileImage}
        }
        style={profilImageBigger}
        resizeMode="cover"
      />
    </View>
  );
};

export default RoundPicture;
