import React, {useState, useCallback,useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {globalStyle, height, width, TOP, spacing} from '../styles/index';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';
import appdata from '../secret/firebaseKey';
import {useDispatch} from 'react-redux';
import {SET_PROFILE_PICTURE} from '../redux/action';
import OneSignal from 'react-native-onesignal'; 
const {capture, preview, container, closeIconContainer} = globalStyle;
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const Fetch = RNFetchBlob.polyfill.Fetch;
// replace built-in fetch
window.fetch = new Fetch({
  auto: true,
  binaryContentTypes: ['image/', 'video/', 'audio/', 'foo/'],
}).build();

const Camera = ({closeCamera}) => {
  const [typeCamera, setTypeCamera] = useState(RNCamera.Constants.Type.back);
  const [flashCamera, setFlashCamera] = useState(
    RNCamera.Constants.FlashMode.off,
  );
  // console.log('render')

  const [photo, setPhoto] = useState(null);
  const [urlPhoto, setUrlPhoto] = useState('');
  const [userPathName, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  
  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.1, base64: true};
      const data = await camera.takePictureAsync(options);
      setPhoto(data.uri);
      console.log(data.uri);
    }
  };
  function formatUpload(uri, mime = 'image/jpeg', name) {
    return new Promise((resolve, reject) => {
      let imgUri = uri;
      let uploadBlob = null;
      const uploadUri =
        Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
      const imageName = `${name}${Date.now()}.jpg`;
      const imageRef = appdata
        .storage()
        .ref(`/images/${userPathName}`)
        .child(imageName);
      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime, name: name});
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
          setUrlPhoto(url);
          uploadData(url);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
  const sendNotification = async () => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic N2I4NjMwNDctOTM3ZC00MTY5LTk2ODktMTVhNjY0ZjAxZGIx',
    };

    let endpoint = 'https://onesignal.com/api/v1/notifications';

    let params = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        app_id: 'a6a1f13d-4669-4d98-86c0-d99aef433795',
        included_segments: ["Active Users"],
        priority: 10,
        contents: {en: `Upload Photo Berhasil`},
        headings: {en: 'Anda Berhasil Upload Photo'},
        buttons: [
          {
            id: 'id1',
            text: 'Tolak',
          },
          {
            id: 'id2',
            text: 'Terima',
          },
        ],
      }),
    };
    fetch(endpoint, params).then(res => console.log('kkk', res));
  };

  async function uploadImage() {
    const mime = 'image/jpeg';

    const name = 'proPicture';
    if (photo) {
      try {
        await formatUpload(photo, mime, name).then((url) => {
          setUrlPhoto(url);
          dispatch(SET_PROFILE_PICTURE(url));
          sendNotification()
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.show('Anda harus memasukkan foto cover', ToastAndroid.SHORT);
    }
  }
  async function handleNext() {
    try {
      setLoading(true);
      await uploadImage();
      await setTimeout(() => {
        setLoading(false);
       
        ToastAndroid.show(
          'Berhasil Mengganti Photo Profil',
          ToastAndroid.SHORT,
        );
        setPhoto(null);
        closeCamera()
      }, 1500);
    } catch (error) {
      alert(error.message);
    }
  }
  const close = useCallback(() => {
    closeCamera();
  }, [close]);
  return (
    <View style={container}>
      {photo !== null ? (
        <View style={globalStyle.preview}>
          <ImageBackground
            source={{uri: photo}}
            style={{flex: 1, flexWrap: 'wrap'}}
            resizeMode="contain">
            {loading && <ActivityIndicator size="large" color="white" />}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width,
              }}>
              <TouchableOpacity
                onPress={() => setPhoto(null)}
                style={closeIconContainer}>
                <MaterialCommunity name="close" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={photo === null}
                onPress={() => handleNext()}
                style={[closeIconContainer, {right: 15}]}>
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
              <TouchableOpacity onPress={close}>
                <MaterialCommunity name="close" size={38} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', top: height / 1.15}}>
            <TouchableOpacity
              onPress={() => alert(`Sorry, this feature have'nt implemented`)}
              style={[capture, {left: -15}]}>
              <MaterialCommunity
                name="camera-image"
                size={40}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => takePicture()} style={capture}>
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
  );
};
export default Camera;
