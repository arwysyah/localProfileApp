import React from 'react'
import {View,Text,Image} from 'react-native'
import {globalStyle,width,height} from '../styles/index'
const {imageWrapper,profilImageBigger}=globalStyle
const RoundPicture=()=>{
    return(
        <View style={imageWrapper}>
           
          <Image 
          source={require('../assets/avatar.jpg')}
          style={profilImageBigger}
          resizeMode="cover"/>
     
          </View>
    )
}

export default RoundPicture