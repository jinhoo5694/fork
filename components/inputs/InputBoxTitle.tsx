import * as React from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';

export default function InputBoxTitle(props: any) {
  const title = props.title;
  const value = props.value;
  const setValue = props.setValue;
  const placeHolder = props.placeHolder;
  const secure = props.secure;
  const windowWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        width: windowWidth * 0.562,
        height: 60,
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Inter',
          includeFontPadding: false,
          fontSize: 13,
          fontWeight: '600',
          textDecorationLine: 'underline',
        }}>
        {props.title}
      </Text>
      <TextInput
        style={{
          width: '100%',
          height: 40,
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderRadius: 10,
          marginTop: 6,
          paddingHorizontal: 16,
        }}
        placehoderTextColor={'#adb5bd'}
        secureTextEntry={secure}
        onChangeText={text => setValue(text)}
        defaultValue={value}
        placeholder={placeHolder}
      />
    </View>
  );
}
