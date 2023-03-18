import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Journeys:
import Home from './ui/Home';

const Tab = createNativeStackNavigator();

const Routes = () => (
  <Tab.Navigator>
    <Tab.Screen key="home" name="Home" component={Home} />
  </Tab.Navigator>
);
export default Routes;
