import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes.js';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const app = () => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>{Routes()}</NavigationContainer>
  </QueryClientProvider>
);
export default app;
AppRegistry.registerComponent(appName, () => app);
