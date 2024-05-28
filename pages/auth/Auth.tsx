import * as React from 'react';
import {View, Text, SafeAreaView, Dimensions, Image, Alert} from 'react-native';
import BlackLongButton from '../../components/buttons/BlackLongButton';
import InputBoxTitle from '../../components/inputs/InputBoxTitle';
import {useState} from 'react';
import WhiteLongButton from '../../components/buttons/WhiteLongButton';
import axios from 'axios';

export default function Auth(props: any) {
  const token = props.token;
  const setToken = props.setToken;
  const setAuthenticated = props.setAuthenticated;
  const [name, setName] = useState('');
  const [page, setPage] = useState(0);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');

  const windowWidth = Dimensions.get('window').width;

  function login() {
    console.log('login');
  }

  function register() {
    if (name == '') {
      Alert.alert('title', 'no name');
    } else if (id == '') {
      Alert.alert('title', 'no email');
    } else if (pw == '') {
      Alert.alert('title', 'no password');
    } else if (confirm !== pw) {
      Alert.alert('title', 'no match');
    } else {
      const requestForm = {
        user_name: name,
        user_email: id,
        user_password: pw,
      };
      axios
        .post(
          'http://121.184.96.94:3001/api/v1/auth/kaist',
          JSON.stringify(requestForm),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(error => console.error(error));
    }
  }

  const loginPage = (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <Image
        source={require('../../public/images/fork.png')}
        style={{
          alignSelf: 'center',
          height: 44,
          width: 102,
          resizeMode: 'contain',
          marginTop: 150,
        }}
      />
      <View
        style={{
          height: 170,
          width: '100%',
          marginTop: 75,
        }}>
        <InputBoxTitle
          title={'Email'}
          value={id}
          setValue={setId}
          placeHolder={'fork@kaist.ac.kr'}
          secure={false}
        />
        <View style={{height: 13}} />
        <InputBoxTitle
          title={'Password'}
          value={pw}
          setValue={setPw}
          placeHolder={'*****'}
          secure={true}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: windowWidth * 0.562,
        }}>
        <BlackLongButton content={'Login'} onPress={() => login()} />
        <View style={{height: 25}} />
        <WhiteLongButton
          content={'Create Account'}
          onPress={() => {
            setId('');
            setPw('');
            setConfirm('');
            setPage(1);
          }}
        />
      </View>
    </View>
  );

  const registerPage = (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <Image
        source={require('../../public/images/fork.png')}
        style={{
          alignSelf: 'center',
          height: 44,
          width: 102,
          resizeMode: 'contain',
          marginTop: 150,
        }}
      />
      <View
        style={{
          height: 250,
          width: '100%',
          marginTop: 60,
        }}>
        <InputBoxTitle
          title={'Name'}
          value={name}
          setValue={setName}
          placeHolder={'James'}
          secure={false}
        />
        <View style={{height: 13}} />
        <InputBoxTitle
          title={'Email'}
          value={id}
          setValue={setId}
          placeHolder={'fork@kaist.ac.kr'}
          secure={false}
        />
        <View style={{height: 13}} />
        <InputBoxTitle
          title={'Password'}
          value={pw}
          setValue={setPw}
          placeHolder={'*****'}
          secure={true}
        />
        <View style={{height: 13}} />
        <InputBoxTitle
          title={'Confirm Password'}
          value={confirm}
          setValue={setConfirm}
          placeHolder={'*****'}
          secure={true}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: windowWidth * 0.562,
          marginTop: 50,
        }}>
        <BlackLongButton
          content={'Create Account'}
          onPress={() => register()}
        />
        <View style={{height: 25}} />
        <WhiteLongButton
          content={'Back to Login'}
          onPress={() => {
            setId('');
            setPw('');
            setConfirm('');
            setPage(0);
          }}
        />
      </View>
    </View>
  );

  function showPage() {
    if (page == 0) {
      return loginPage;
    } else if (page == 1) {
      return registerPage;
    } else {
      return <View />;
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}>
      {showPage()}
    </SafeAreaView>
  );
}
