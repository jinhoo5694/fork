import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function BlackLongButton(props: any) {
  const content = props.content;
  const onPress = props.onPress;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 20,
      }}>
      <Text
        style={{
          color: '#fff',
        }}>
        {content}
      </Text>
    </TouchableOpacity>
  );
}
