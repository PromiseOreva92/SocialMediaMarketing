import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import PersonalInfo from './PersonalInfo';
import Security from './Security';
import ResetPassword from './ResetPassword';
import Settings from './Settings';
const Stack = createStackNavigator();

const ProfileMenu = () =>{
    return (
        <Stack.Navigator 
        initialRouteName={'ProfileScreen'}
        screenOptions={{
            headerShown: false, // Hide the header bar for all screens in this navigator
          }}>
            <Stack.Screen name='ProfileScreen' component={Profile}/>
            <Stack.Screen name='PersonalInfoScreen' component={PersonalInfo}/>
            <Stack.Screen name='SecurityScreen' component={Security}/>
            <Stack.Screen name='ResetPasswordScreen' component={ResetPassword}/>
            <Stack.Screen name='SettingsScreen' component={Settings}/>
        </Stack.Navigator>
    );
}

export default ProfileMenu;