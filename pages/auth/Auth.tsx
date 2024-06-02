import * as React from 'react';
import {View, Text, SafeAreaView, Dimensions, Image, Alert} from 'react-native';
import BlackLongButton from '../../components/buttons/BlackLongButton';
import InputBoxTitle from '../../components/inputs/InputBoxTitle';
import {useState} from 'react';
import WhiteLongButton from '../../components/buttons/WhiteLongButton';
import axios from 'axios';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import AuthPage from './AuthPage';

export default function Auth(props: any) {
  const token = props.token;
  const setToken = props.setToken;
  const setAuthenticated = props.setAuthenticated;
  const setUserId = props.setUserId;
  const [id, setId] = useState('');
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');

  function showPage() {
    if (page == 0) {
      return (
        <LoginPage
          id={id}
          setId={setId}
          pw={pw}
          setPw={setPw}
          setPage={setPage}
          setConfirm={setConfirm}
          setToken={setToken}
          setAuthenticated={setAuthenticated}
          setUserId={setUserId}
        />
      );
    } else if (page == 1) {
      return (
        <RegisterPage
          id={id}
          setId={setId}
          email={email}
          setEmail={setEmail}
          pw={pw}
          setPw={setPw}
          confirm={confirm}
          setConfirm={setConfirm}
          setPage={setPage}
        />
      );
    } else if (page == 2) {
      return <AuthPage email={email} setPage={setPage} />;
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
