import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Services from './Services';
import ServiceList from './ServiceList';
import PurchaseService from './PurchaseService';
const Stack = createStackNavigator();

const ServiceStack = () =>{
    return (
        <Stack.Navigator 
        initialRouteName={'ServiceScreen'}
        screenOptions={{
            headerShown: false, // Hide the header bar for all screens in this navigator
          }}>
            <Stack.Screen name='ServicesScreen' component={Services}/>
            <Stack.Screen name='ServiceListScreen' component={ServiceList}/>
            <Stack.Screen name='PurchaseScreen' component={PurchaseService}/>
            
        </Stack.Navigator>
    );
}

export default ServiceStack;