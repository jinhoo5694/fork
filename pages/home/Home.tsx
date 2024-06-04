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
  ScrollView,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useContext, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import AppContext from '../../AppContext';
import axios from 'axios';
import StarRating from 'react-native-star-rating-widget';
import ReviewCard from './ReviewCard.tsx';

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
  const [averageScore, setAverageScore] = useState(0);
  const [reviews, setReviews] = useState([]);
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

  function getBookMark() {
    axios
      .get('http://121.184.96.94:3001/api/v1/bookmark', {
        headers: {
          Authorization: 'Bearer ' + context.token,
        },
      })
      .then(response => console.log(response.data.item))
      .catch(error => console.error(error));
  }

  function addBookMark(id: string) {
    const requestForm = {
      facility_id: id,
    };
    axios
      .post(
        'http://121.184.96.94:3001/api/v1/bookmark',
        JSON.stringify(requestForm),
        {
          headers: {
            Authorization: 'Bearer ' + context.token,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }

  function handleClick(facility: object) {
    setModal(true);
    setTarget(facility);
    console.log(facility);
    axios
      .get('http://121.184.96.94:3001/api/v1/facility/' + facility.id, {})
      .then(response => {
        if (response.data.success) {
          setAverageScore(
            Math.round(response.data.item.AverageReviewScore * 100) / 100,
          );
          axios
            .get(
              'http://121.184.96.94:3001/api/v1/review?facility_id=' +
                facility.id,
              {
                headers: {
                  Authorization: 'Bearer ' + context.token,
                },
              },
            )
            .then(resp => {
              setReviews(resp.data.item.ReviewList);
            })
            .catch(err => console.error(err));
        } else {
          Alert.alert('Error');
          setModal(false);
        }
      })
      .catch(error => console.error(error));
  }

  console.log(reviews.length);
  console.log(averageScore);

  const facilityMarkers = filteredFacilities.map(facility => (
    <Marker
      tracksViewChanges={Platform.OS === 'ios'}
      key={facility.id}
      coordinate={{
        latitude: parseFloat(facility.latitude),
        longitude: parseFloat(facility.longitude),
      }}
      onPress={() => {
        handleClick(facility);
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

  console.log(target);
  const reviewCards = reviews.map(review => (
    <ReviewCard key={review.id} review={review} />
  ));

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
              padding: 20,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <View
              style={{
                width: '100%',
                height: 30,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: '100%',
                  aspectRatio: 1,
                }}
              />
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#000',
                  }}>
                  {target.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={{
                  height: '100%',
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../public/icons/close.png')}
                  style={{
                    height: 16,
                    width: 16,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <StarRating
                rating={averageScore}
                onChange={value => console.log(value)}
              />
              <Text>{'( ' + averageScore + ' / 5.0 )'}</Text>
            </View>
            <View
              style={{
                height: 100,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{
                  uri:
                    'http://121.184.96.94:3001/api/v1/image/' + target.imageId,
                }}
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#f4f4f4',
                alignItems: 'center',
                marginTop: 10,
                padding: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  height: 'auto',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginVertical: 3,
                }}>
                <Image
                  source={require('../../public/icons/position.png')}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                  }}>
                  <Text>{target.address}</Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 'auto',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginVertical: 3,
                }}>
                <Image
                  source={require('../../public/icons/message.png')}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                  }}>
                  <Text>{target.description}</Text>
                </View>
              </View>
            </View>
            <ScrollView
              style={{
                width: '100%',
              }}>
              {reviewCards}
            </ScrollView>
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
        {position ? (
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
        ) : (
          <View />
        )}

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
