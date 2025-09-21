import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RoleChooseScreen from '../screens/RoleChooseScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import EmergencyOptionsScreen from '../screens/EmergencyOptionsScreen';
import LocationSelectScreen from '../screens/LocationSelectScreen';
import FireStationSelectScreen from '../screens/FireStationSelectScreen';

export type RootStackParamList = {
  RoleChoose: undefined;
  UserHome: undefined;
  AdminHome: undefined;
  EmergencyOptions: undefined;
  LocationSelectScreen: { type: string };
  FireStationSelectScreen: { location: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleChoose" component={RoleChooseScreen} />
      <Stack.Screen name="UserHome" component={UserHomeScreen} />
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="EmergencyOptions" component={EmergencyOptionsScreen} />
      <Stack.Screen name="LocationSelectScreen" component={LocationSelectScreen} />
      <Stack.Screen
        name="FireStationSelectScreen"
        component={FireStationSelectScreen}
      />
    </Stack.Navigator>
  );
}
