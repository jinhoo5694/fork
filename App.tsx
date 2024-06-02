/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {PropsWithChildren, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Main from './pages/Main';
import {NavigationContainer} from '@react-navigation/native';
import AppContext from './AppContext';
import Auth from './pages/auth/Auth';

function App(): React.JSX.Element {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState('');

  const authValues = {
    authenticated: authenticated,
    setAuthenticated,
    token: token,
    setToken,
    userId: userId,
    setUserId,
  };

  if (!authenticated) {
    return (
      <AppContext.Provider value={authValues}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#f5f5f5',
          }}>
          <Auth
            token={token}
            setToken={setToken}
            setAuthenticated={setAuthenticated}
            setUserId={setUserId}
          />
        </SafeAreaView>
      </AppContext.Provider>
    );
  } else {
    return (
      <AppContext.Provider value={authValues}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#f5f5f5',
          }}>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </SafeAreaView>
      </AppContext.Provider>
    );
  }
}

export default App;
