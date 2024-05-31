import * as React from 'react';
import {View, Text, Dimensions, Image, Alert} from 'react-native';
import InputBoxTitle from '../../components/inputs/InputBoxTitle';
import BlackLongButton from '../../components/buttons/BlackLongButton';
import WhiteLongButton from '../../components/buttons/WhiteLongButton';
import axios from 'axios';

export default function RegisterPage(props: any) {
  const windowWidth = Dimensions.get('window').width;
  const id = props.id;
  const setId = props.setId;
  const email = props.email;
  const setEmail = props.setEmail;
  const pw = props.pw;
  const setPw = props.setPw;
  const confirm = props.confirm;
  const setConfirm = props.setConfirm;
  const setPage = props.setPage;

  function sendEmail() {
    axios
      .post(
        'http://121.184.96.94:3001/api/v1/auth/email?email=' + email,
        {},
        {},
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => console.error(error));
  }

  function register() {
    if (id == '') {
      Alert.alert('title', 'no id');
    } else if (email == '') {
      Alert.alert('title', 'no email');
    } else if (pw == '') {
      Alert.alert('title', 'no password');
    } else if (confirm !== pw) {
      Alert.alert('title', 'no match');
    } else {
      const requestForm = {
        user_name: id,
        user_email: email,
        user_password: pw,
      };
      console.log(requestForm);
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
          if (response.data.success) {
            sendEmail();
            setId('');
            setPw('');
            setConfirm('');
            setPage(2);
          } else {
            Alert.alert('error');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
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
          height: 250,
          width: '100%',
          marginTop: 60,
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
          title={'Email'}
          value={email}
          setValue={setEmail}
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
}
