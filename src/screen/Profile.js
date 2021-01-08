import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Map from '../components/mapView';
import Geolocation from 'react-native-geolocation-service';
import {width, height, globalStyle} from '../styles/index';
import {PERMISSIONS, request} from 'react-native-permissions';
import RoundPicture from '../components/roundPicture';
const {
  container,
  profileInfoText,
  mapContainer,
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
  const [camera, setCamera] = useState(false);

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

  return (
    <View style={([container], {alignItems: 'center'})}>
      <TouchableOpacity
        style={{top: 20}}
        onPress={() => navigation.navigate('Camera')}>
        <RoundPicture />
      </TouchableOpacity>
      <View style={{top: 30}}>
        <View style={profileInfoTouchable}>
          <Text style={{fontSize: 12, color: 'grey', textAlign: 'center'}}>
            E-mail Address
          </Text>

          <Text style={[profileInfoText, {textAlign: 'center'}]}>
            ahahahaha
          </Text>
        </View>
        <View style={profileInfoTouchable}>
          <Text style={{fontSize: 12, color: 'grey', textAlign: 'center'}}>
            Password
          </Text>

          <Text style={[profileInfoText, {textAlign: 'center'}]}>********</Text>
        </View>
      </View>

      <View style={{top: 70}}>
        <Map data={dataMap} />
      </View>
    </View>
  );
};
export default Profile;
