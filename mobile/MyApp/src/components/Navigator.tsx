import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/Login';
import {SettingsPage} from '../screens/Settings';

const {Navigator, Screen} = createStackNavigator();

const LoginNavigator = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login">
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Settings" component={SettingsPage} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <LoginNavigator />
  </NavigationContainer>
);
