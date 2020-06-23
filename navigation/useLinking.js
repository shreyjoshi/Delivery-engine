import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Log:{
        path: 'login',
        screens:{
          Login: 'login'
        }
      },
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Links: 'links',
          Settings: 'settings',
          Dashboard: 'dashboard'
        },
      },
    },
  });
}
