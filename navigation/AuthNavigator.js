import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/LoginScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

// import Signup from '../screens/Signup'


// const AuthNavigation = createStackNavigator(
//   {
//     Login: { screen: Login },
//     // Signup: { screen: Signup }
//   },
//   {
//     initialRouteName: 'Login'
//   }
// )

const BottomTab = createBottomTabNavigator();

export default function AuthNavigation({ navigation, route }) {
    // navigation.setOptions({ header: "none" });

  return (
    <BottomTab.Navigator
    initialRouteName="Login"
    screenOptions={{
        headerMode: 'none'
      }}
    >
      <BottomTab.Screen name="Login" component={Login} headerMode="none"/>
    </BottomTab.Navigator>
  );
}

// export default MyStack;