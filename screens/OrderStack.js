import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Order from './Order';
import ServiceStack from './ServiceStack';
import OrderDetails from './OrderDetails';
import ServiceList from './ServiceList';
import PurchaseService from './PurchaseService';
const Stack = createStackNavigator();

const OrderStack = () =>{
    return (
        <Stack.Navigator 
        initialRouteName={'OrderScreen'}
        screenOptions={{
            headerShown: false, // Hide the header bar for all screens in this navigator
          }}>

            <Stack.Screen name='OrderScreen' component={Order}/>
            <Stack.Screen name='OrderDetailsScreen' component={OrderDetails}/>
            <Stack.Screen name='ServiceStack' component={ServiceStack}/>
            <Stack.Screen name='ServiceListScreen' component={ServiceList}/>
            <Stack.Screen name='PurchaseScreen' component={PurchaseService}/>           
            
        </Stack.Navigator>
    );
}

export default OrderStack;