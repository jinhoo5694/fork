import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import AppContext from '../../AppContext.tsx';
import axios from 'axios';

export default function User({navigation}) {
  const context = useContext(AppContext);
  const windowWidth = Dimensions.get('window').width;
  const userId = context.userId;
  // const userId = 'f85949d0-8d23-487e-bb33-d8355b199ed1';
  const [userInfo, setUserInfo] = useState({});

  function getUserInfo() {
    axios
      .get('http://121.184.96.94:3001/api/v1/user', {
        headers: {
          Authorization: 'Bearer ' + context.token,
        },
      })
      .then(response => {
        if (response.data.success) {
          const userList = response.data.item.UserList;
          console.log(userList);
        }
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor: '#fff',
      }}>
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: '100%',
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Image
            source={require('../../public/icons/backward.png')}
            style={{
              height: 24,
              width: 24,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{'Mypage'}</Text>
        </View>
        <TouchableOpacity
          style={{
            height: '100%',
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}>
          <Image
            source={require('../../public/icons/settings.png')}
            style={{
              height: 24,
              width: 24,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text>This is the user main page</Text>
      </View>
    </SafeAreaView>
  );
}
