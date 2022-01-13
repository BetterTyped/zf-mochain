/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten TypeScript template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react';
import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';
import {AppNavigator} from "./src/components/Navigator";
import {MainContextProvider} from './src/contexts/main.context';


export default (): React.ReactFragment => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <MainContextProvider>
          <AppNavigator />
        </MainContextProvider>
    </ApplicationProvider>
  </>
);
