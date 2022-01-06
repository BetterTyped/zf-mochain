import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from "../screens/Login";


const { Navigator, Screen } = createStackNavigator();

const LoginNavigator = () => (
  <Navigator screenOptions={{
    headerShown: false,
  }} initialRouteName='Login'>
    <Screen name='Login' component={LoginScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer >
    <LoginNavigator/>
  </NavigationContainer>
)
