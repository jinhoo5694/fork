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
  TextInput,
  TouchableOpacity,
  Modal,
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
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  const [target, setTarget] = useState({});
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
          setFilteredFacilities(response.data.item.FacilityList);
        } else {
          Alert.alert('error');
        }
      })
      .catch(error => console.error(error));
  }

  const facilityMarkers = filteredFacilities.map(facility => (
    <Marker
      tracksViewChanges={Platform.OS === 'ios'}
      key={facility.id}
      coordinate={{
        latitude: parseFloat(facility.latitude),
        longitude: parseFloat(facility.longitude),
      }}
      onPress={() => {
        setModal(true);
        setTarget(facility);
      }}
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
      <Modal
        visible={modal}
        transparent={true}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <SafeAreaView
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: '75%',
              width: '100%',
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity onPress={() => setModal(false)}>
              <Text>close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        customMapStyle={[
          {
            featureType: 'poi',
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
            latitude: parseFloat(String(position.coords.latitude)),
            longitude: parseFloat(String(position.coords.longitude)),
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
      <View
        style={{
          height: 40,
          width: '100%',
          position: 'absolute',
          alignSelf: 'flex-start',
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            height: '100%',
            flex: 1,
            marginRight: 10,
            borderRadius: 20,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../public/icons/find.png')}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <TextInput
            style={{
              height: '100%',
              flex: 1,
              marginRight: 10,
              borderRadius: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
            }}
            value={input}
            onChangeText={text => {
              setInput(text);
              const filtered = facilities.filter(
                item => item.name.includes(text) || item.nameEng.includes(text),
              );
              setFilteredFacilities(filtered);
            }}
            placeholder={'Search Here'}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (context.token) {
              navigation.navigate('User');
            } else {
              Alert.alert('No permission');
            }
          }}
          style={{
            height: '100%',
            width: 40,
          }}>
          <Image
            source={require('../../public/icons/profile.png')}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
