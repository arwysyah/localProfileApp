import React, {memo, useMemo} from 'react';
import {Platform, SafeAreaView} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {width, height, globalStyle} from '../styles/index';

const Map = (dataMap) => {
  const mapRef = React.createRef();

  const newData = useMemo(() => {
    return dataMap;
  }, [dataMap]);
  const {latitude, longitude, latitudeDelta, longitudeDelta} = newData.data;

  return (
    <SafeAreaView style={globalStyle.mapContainer}>
      <MapView
        ref={mapRef}
        liteMode
        style={{
          height: 300,
          width: width * 0.9,
          borderRadius: 20,        //  using map lite more faster and no need gesture 
        }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
    </SafeAreaView>
  );
};
export default memo(Map);
