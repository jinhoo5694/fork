import * as React from 'react';
import {View, Text, TextInput} from 'react-native';

export default function InputBoxTitle(props: any) {
  const title = props.title;
  const value = props.value;
  const setValue = props.value;
  const validInput = props.validInput;
  const placeHolder = props.placeHolder;

  return (
    <View
      style={{
        width: '100%',
        height: 100,
      }}>
      <Text>{props.title}</Text>
    </View>
  );
}
