import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Image,
  Alert,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useContext, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import AppContext from '../../AppContext';
import axios from 'axios';

export default function Home({navigation}) {
  const context = useContext(AppContext);
  const [position, setPosition] = useState({
    coords: {
      latitude: 36.369552,
      longitude: 127.362626,
    },
  });
  const [facilities, setFacilities] = useState([]);

  async function requestPermission() {
    try {
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
      if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  function getFacilities() {
    axios
      .get('http://121.184.96.94:3001/api/v1/facility', {})
      .then(response => {
        if (response.data.success) {
          setFacilities(response.data.item.FacilityList);
        } else {
          Alert.alert('error');
        }
      })
      .catch(error => console.error(error));
  }

  const facilityMarkers = facilities.map(facility => (
    <Marker
      tracksViewChanges={Platform.OS === 'ios'}
      key={facility.id}
      coordinate={{
        latitude: parseFloat(facility.latitude),
        longitude: parseFloat(facility.longitude),
      }}
      onPress={() => console.log('handle click')}
      style={{flexDirection: 'column', alignItems: 'center'}}>
      <Image
        source={require('../../public/icons/marker.png')}
        style={{
          height: 46,
          width: 39.48,
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          fontSize: 11,
          marginTop: 5,
          textAlign: 'center',
        }}>
        {facility.name}
      </Text>
    </Marker>
  ));

  useEffect(() => {
    requestPermission().then(result => {
      if (result == 'granted') {
        Geolocation.getCurrentPosition(
          pos => setPosition(pos),
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 3600,
            maximumAge: 3600,
          },
        );
      }
    });
    getFacilities();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        customMapStyle={[
          {
            featureStyle: 'poi',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}],
          },
        ]}
        initialRegion={{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}>
        <Marker
          tracksViewChanges={true}
          coordinate={{
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
          }}>
          <Image
            source={require('../../public/icons/mylocation.png')}
            style={{
              height: 24,
              width: 24,
            }}
          />
        </Marker>
        {facilityMarkers}
      </MapView>
    </SafeAreaView>
  );
}
