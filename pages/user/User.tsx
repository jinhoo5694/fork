import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

export default function User({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View>
        <Text>This is the user main page</Text>
      </View>
    </SafeAreaView>
  );
}
