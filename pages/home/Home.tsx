import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

export default function Home({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View>
        <Text>This is the homepage</Text>
      </View>
    </SafeAreaView>
  );
}
