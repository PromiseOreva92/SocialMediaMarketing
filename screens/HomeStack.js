import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import ServiceStack from './ServiceStack';
import Funding from './Funding';
import ServiceList from './ServiceList';
import PurchaseService from './PurchaseService';
import PaystackForm from './PaystackForm';
import CoinbaseForm from './CoinbaseForm';
import Categories from './Categories';
import Coinbase from './Coinbase';
import Pay from './Pay';
const Stack = createStackNavigator();

const HomeStack = () =>{
    return (
        <Stack.Navigator 
        initialRouteName={'HomeScreen'}
        screenOptions={{
            headerShown: false, // Hide the header bar for all screens in this navigator
          }}>

            <Stack.Screen name='HomeScreen' component={Home}/>
            <Stack.Screen name='ServiceStack' component={ServiceStack}/>
            <Stack.Screen name='ServiceListScreen' component={ServiceList}/>
            <Stack.Screen name='PurchaseScreen' component={PurchaseService}/>
            <Stack.Screen name='FundingScreen' component={Funding}/>
            <Stack.Screen name='PaystackScreen' component={PaystackForm}/>
            <Stack.Screen name='PayScreen' component={Pay}/>
            <Stack.Screen name='CoinbaseScreen' component={Coinbase}/>
            <Stack.Screen name='CoinbaseFormScreen' component={CoinbaseForm}/>
            <Stack.Screen name='CategoriesScreen' component={Categories}/>
            
        </Stack.Navigator>
    );
}

export default HomeStack;