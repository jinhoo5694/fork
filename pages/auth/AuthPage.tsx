import * as React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {useContext, useState} from 'react';
import InputBoxTitle from '../../components/inputs/InputBoxTitle';
import BlackLongButton from '../../components/buttons/BlackLongButton';
import WhiteLongButton from '../../components/buttons/WhiteLongButton';
import AppContext from '../../AppContext';
import axios from 'axios';

export default function AuthPage(props: any) {
  const windowWidth = Dimensions.get('window').width;
  const email = props.email;
  const setPage = props.setPage;
  const [code, setCode] = useState('');

  function auth() {
    axios
      .get(
        'http://121.184.96.94:3001/api/v1/auth/verify/email?email=' +
          email +
          '&code=' +
          code,
        {},
      )
      .then(response => {
        if (response.data.success) {
          setPage(0);
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
          height: 120,
          width: '100%',
          marginTop: 60,
        }}>
        <InputBoxTitle
          title={'Enter Verification Code'}
          value={code}
          setValue={setCode}
          placeHolder={'123456'}
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
        <BlackLongButton content={'Verify Email'} onPress={() => auth()} />
        <View style={{height: 25}} />
      </View>
    </View>
  );
}
