import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/LoginScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';

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
    tabBarOptions={{
        activeTintColor: 'red',
      }}
    >
      <BottomTab.Screen 
        name="Login" 
        component={Login} 
        headerMode="none"
        options={{
          title: 'Login',
          backgroundColor:"red",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} backgroundColor={"red"} name="md-log-in" />,
        }}/>
    </BottomTab.Navigator>
  );
}

// export default MyStack;