
import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {globalStyle, height, width, TOP, spacing} from '../styles/index';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob'
const{capture,preview,container}=globalStyle
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const Fetch = RNFetchBlob.polyfill.Fetch;
// replace built-in fetch
window.fetch = new Fetch({
  // enable this option so that the response data conversion handled automatically
  auto: true,
  // when receiving response data, the module will match its Content-Type header
  // with strings in this array. If it contains any one of string in this array,
  // the response body will be considered as binary data and the data will be stored
  // in file system instead of in memory.
  // By default, it only store response data to file system when Content-Type
  // contains string `application/octet`.
  binaryContentTypes: ['image/', 'video/', 'audio/', 'foo/'],
}).build();

const Camera=({navigation})=>{
    const [typeCamera, setTypeCamera] = useState(RNCamera.Constants.Type.back);
    const [flashCamera, setFlashCamera] = useState(
      RNCamera.Constants.FlashMode.off,
    );
    const [photo, setPhoto] = useState(null);
    const [urlPhoto, setUrlPhoto] = useState('');
    const [userPathName, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const takePicture = async () => {
        if (camera) {
          const options = {quality: 0.5, base64: true};
          const data = await camera.takePictureAsync(options);
          setPhoto(data.uri);
          console.log(data.uri);
        }
      };
    return(
        <View style={container}>
           {photo !== null ? (
        <View style={globalStyle.preview}>
          <ImageBackground
            source={{uri: photo}}
            style={{flex: 1, flexWrap: 'wrap'}}
            resizeMode='contain'>
            {loading && <ActivityIndicator size="large" color="white" />}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width,
              }}>
              <TouchableOpacity
                onPress={() => setPhoto(null)}
                style={globalStyle.closeIconContainer}>
                <MaterialCommunity name="close" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
              disabled={photo===null}
                onPress={()=>from ==='EditProfile'? handleNext():navigation.navigate('GalleryPhoto',{uri:photo})}
                style={[globalStyle.closeIconContainer, {right: 15}]}>
                <MaterialCommunity
                  name="skip-next-circle-outline"
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : (
       <RNCamera
          ref={(ref) => {
            camera = ref;
          }}
          style={preview}
          // ratio={'1:1'}
          type={typeCamera}
          flashMode={flashCamera}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width,
                top: TOP - spacing,
                paddingHorizontal: 15,
              }}>
              <TouchableOpacity
                onPress={() =>
                  setFlashCamera(
                    flashCamera === RNCamera.Constants.FlashMode.off
                      ? RNCamera.Constants.FlashMode.torch
                      : RNCamera.Constants.FlashMode.off,
                  )
                }>
                <MaterialCommunity
                  name={
                    flashCamera === RNCamera.Constants.FlashMode.off
                      ? 'flash-off'
                      : 'flash'
                  }
                  size={38}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunity name="close" size={38} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', top: height / 1.15}}>
            <TouchableOpacity
              // onPress={openGallery}
              style={[capture, {left: -15}]}>
              <MaterialCommunity
                name="camera-image"
                size={40}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => takePicture()}
              style={capture}>
              <MaterialCommunity name="camera-iris" size={60} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[capture, {left: 15}]}
              onPress={() =>
                setTypeCamera(
                  typeCamera === RNCamera.Constants.Type.back
                    ? RNCamera.Constants.Type.front
                    : RNCamera.Constants.Type.back,
                )
              }>
              <MaterialCommunity
                name="camera-control"
                size={43}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </RNCamera>
      )}
        </View>
    )
}
export default Camera