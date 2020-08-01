import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import InventoryScreen2 from '../screens/InventoryScreen2';
import NotificationScreen from '../screens/NotificationScreen';

import ProfileScreen from '../screens/ProfileScreen';
import MyHomeScreen from '../screens/MyHomeScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Profile';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}  tabBarOptions={{
      activeTintColor: 'red',
    }}>
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        
        options={{
          title: "Profile",
          backgroundColor:"red",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} backgroundColor={"red"} name="ios-person" />

        }}
      />
      <BottomTab.Screen
        name="Home"
        component={MyHomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} backgroundColor={"red"} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: 'Notification',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} backgroundColor={"red"} name="ios-notifications" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Profile':
      return 'Profile';
    case 'Home':
      return 'MyHomeScreen';
    case 'Notification':
      return 'Orders';
  }
}
