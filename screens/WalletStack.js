import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Funding from './Funding';
import Wallet from './Wallet';
import TransactionDetails from './TransactionDetails';
import PaystackForm from './PaystackForm';
import Pay from './Pay';
import Coinbase from './Coinbase';
import CoinbaseForm from './CoinbaseForm';

const Stack = createStackNavigator();

const WalletStack = () =>{
    return (
        <Stack.Navigator 
        initialRouteName={'WalletScreen'}
        screenOptions={{
            headerShown: false, // Hide the header bar for all screens in this navigator
          }}>

            <Stack.Screen name='WalletScreen' component={Wallet}/>
            <Stack.Screen name='FundingScreen' component={Funding}/>
            <Stack.Screen name='PaystackScreen' component={PaystackForm}/>
            <Stack.Screen name='PayScreen' component={Pay}/>
            <Stack.Screen name='TransactionDetailsScreen' component={TransactionDetails}/>
            <Stack.Screen name='CoinbaseScreen' component={Coinbase}/>
            <Stack.Screen name='CoinbaseFormScreen' component={CoinbaseForm}/>

        </Stack.Navigator>
    );
}

export default WalletStack;