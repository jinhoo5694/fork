import * as React from 'react';
import {View, Text, Dimensions, Image, Alert} from 'react-native';
import InputBoxTitle from '../../components/inputs/InputBoxTitle';
import BlackLongButton from '../../components/buttons/BlackLongButton';
import WhiteLongButton from '../../components/buttons/WhiteLongButton';
import axios from 'axios';

export default function LoginPage(props: any) {
  const windowWidth = Dimensions.get('window').width;
  const id = props.id;
  const setId = props.setId;
  const pw = props.pw;
  const setPw = props.setPw;
  const setPage = props.setPage;
  const setConfirm = props.setConfirm;
  const setToken = props.setToken;
  const setAuthenticated = props.setAuthenticated;
  const setUserId = props.setUserId;

  function login() {
    const requestForm = {
      user_name: id,
      user_password: pw,
    };
    axios
      .post('http://121.184.96.94:3001/api/v1/auth/login', requestForm, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.data.success) {
          setToken(response.data.item.OAuthToken);
          setAuthenticated(true);
          setUserId(id);
        } else {
          Alert.alert(response.data.error_text);
        }
      })
      .catch(error => console.error(error));
  }

  return (
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
          title={'Id'}
          value={id}
          setValue={setId}
          placeHolder={'id1234'}
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
}
