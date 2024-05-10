import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './home/Home';
import Facility from './facility/Facility';
import Review from './review/Review';
import User from './user/User';
import Stamp from './stamp/Stamp';

export default function Main() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Home'} component={Home} />
      <Stack.Screen name={'Facility'} component={Facility} />
      <Stack.Screen name={'Review'} component={Review} />
      <Stack.Screen name={'Stamp'} component={Stamp} />
      <Stack.Screen name={'User'} component={User} />
    </Stack.Navigator>
  );
}
