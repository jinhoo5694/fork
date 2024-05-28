import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function WhiteLongButton(props: any) {
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
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
      }}>
      <Text
        style={{
          fontFamily: 'Inter',
          includeFontPadding: false,
          fontSize: 13,
          fontWeight: '600',
          color: '#000',
        }}>
        {content}
      </Text>
    </TouchableOpacity>
  );
}
