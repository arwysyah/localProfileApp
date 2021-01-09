import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Map from '../components/mapView';
import Geolocation from 'react-native-geolocation-service';
import {width, height, globalStyle, spacing} from '../styles/index';
import {PERMISSIONS, request} from 'react-native-permissions';
import RoundPicture from '../components/roundPicture';
import {useSelector, useDispatch} from 'react-redux';
import {SET_PROFILE_PICTURE} from '../redux/action';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Camera from '../components/Camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {
  container,
  profileInfoText,
  textButton,
  commonButton,
  backIconContainer,
  profileInfoTouchable,
} = globalStyle;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0155;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Profile = ({navigation}) => {
  const [dataMap, setDataMap] = useState({
    latitude: -6.121435,
    longitude: 106.774124,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const globalState = useSelector((state) => state);
  const email = globalState.profile.email;
  const [camera, setCamera] = useState(false);

  const dispatch = useDispatch();
  async function LogOut() {
    //optimization function on Onpress
    let picture = null;
    dispatch(SET_PROFILE_PICTURE(picture));
    AsyncStorage.clear();
    navigation.replace('Login');
  }
  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
      async (result) => {
        result === 'denied'
          ? alert('Sorry You Must Allow Maps')
          : await Geolocation.getCurrentPosition(
              async (position) => {
                const region = {
                  latitude: parseFloat(position.coords.latitude),
                  longitude: parseFloat(position.coords.longitude),
                  latitudeDelta: 0.0009,
                  longitudeDelta: 0.0008,
                };
                setDataMap((prevState) => ({
                  ...prevState,
                  latitude: region.latitude,
                  longitude: region.longitude,
                  latitudeDelta: region.latitudeDelta,
                  longitudeDelta: region.longitudeDelta,
                }));
              },
              (error) => {
                alert(error.code, error.message);
              },
              {enableHighAccuracy: true, timeout: 20000},
            );
      },
    );
  };
  function closeCamera() {
    setCamera(false);
  }

  return (
    <>
      {camera !== true ? (
        <SafeAreaView style={container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              height: 2 * spacing,
              top: spacing - 4,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={backIconContainer}>
              <MaterialCommunity name="arrow-left" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={{top: 20}} onPress={() => setCamera(true)}>
              <RoundPicture />
            </TouchableOpacity>
            <View style={{top: 30}}>
              <View style={profileInfoTouchable}>
                <Text
                  style={{fontSize: 12, color: 'grey', textAlign: 'center'}}>
                  E-mail Address
                </Text>

                <Text style={[profileInfoText, {textAlign: 'center'}]}>
                  {email}
                </Text>
              </View>
              <View style={profileInfoTouchable}>
                <Text
                  style={{fontSize: 12, color: 'grey', textAlign: 'center'}}>
                  Password
                </Text>
                <Text style={[profileInfoText, {textAlign: 'center'}]}>
                  ********
                </Text>
              </View>
            </View>

            <View style={{top: 50}}>
              <Map data={dataMap} />
            </View>
            <View style={{height: 50}} />
            <TouchableOpacity style={commonButton} onPress={LogOut}>
              <Text style={textButton}>Logout</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <Camera closeCamera={closeCamera} />
      )}
    </>
  );
};
export default Profile;
