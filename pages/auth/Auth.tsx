import * as React from 'react';
import {View, Text, SafeAreaView, Dimensions, Image} from 'react-native';
import BlackLongButton from '../../components/buttons/BlackLongButton';

export default function Auth(props: any) {
  const token = props.token;
  const setToken = props.setToken;
  const setAuthenticated = props.setAuthenticated;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}>
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
            marginTop: 186,
          }}
        />
        <View
          style={{
            height: 250,
            width: windowWidth * 0.339,
          }}
        />
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: windowWidth * 0.339,
          }}>
          <BlackLongButton
            content={'Login'}
            onPress={() => setAuthenticated(true)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
