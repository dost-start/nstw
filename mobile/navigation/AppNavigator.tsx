import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RoleChooseScreen from '../screens/RoleChooseScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import EmergencyOptionsScreen from '../screens/EmergencyOptionsScreen';
import LocationSelectScreen from '../screens/LocationSelectScreen';
import FireStationSelectScreen from '../screens/FireStationSelectScreen';
import MenuScreen from '../screens/MenuScreen';
import HotlinesScreen from '../screens/HotlinesScreen';

export type RootStackParamList = {
  RoleChoose: undefined;
  UserHome: undefined;
  AdminHome: undefined;
  EmergencyOptions: undefined;
  LocationSelectScreen: { type: string };
  Hotlines: undefined;
  FireStationSelectScreen: { location: string };
  Menu: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleChoose" component={RoleChooseScreen} />
      <Stack.Screen name="UserHome" component={UserHomeScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="EmergencyOptions" component={EmergencyOptionsScreen} />
      <Stack.Screen name="LocationSelectScreen" component={LocationSelectScreen} />
      <Stack.Screen name="Hotlines" component={HotlinesScreen} />
      <Stack.Screen name="FireStationSelectScreen" component={FireStationSelectScreen} />
    </Stack.Navigator>
  );
}
