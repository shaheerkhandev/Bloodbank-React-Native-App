// App.js is in functional component because of React navigation router.
// Every class component will be wraped in a functional component.

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login'
import Register from './screens/register'
import Home from './screens/home'
import Profile from './screens/profile'
import Editprofile from './screens/editprofile'
import Userprofile from './screens/userprofile'

const Stack = createStackNavigator();

export default function App() {
    return(
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Editprofile" component={Editprofile} />
        <Stack.Screen name="Userprofile" component={Userprofile} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}